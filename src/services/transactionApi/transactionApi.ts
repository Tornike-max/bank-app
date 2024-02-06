import { ID, Query } from "appwrite";
import { appwriteConfig, databases } from "../../appwrite/appwriteConfig";
import { TransferType } from "../../types/types";

export async function createTransaction(transferData: TransferType) {
  try {
    const promise = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.transactionCollectionId,
      ID.unique(),
      transferData
    );
    if (!promise) throw Error("Error while making transfer");

    const getUserAccount = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.accountCollectionId,
      promise?.user?.account?.$id
    );

    if (!getUserAccount) throw new Error("Error while getting user account");

    const decreaseFromBalance = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.accountCollectionId,
      getUserAccount.$id,
      {
        balance: Number(getUserAccount.balance) - Number(transferData?.amount),
        outcome: Number(getUserAccount.outcome) + Number(transferData?.amount),
      }
    );

    if (!decreaseFromBalance)
      throw new Error("Error while increase user balance");

    const getToAcc = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.accountCollectionId,
      transferData.to
    );

    if (!getToAcc) throw Error("Error while getting To Acc");

    const increaseToBalance = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.accountCollectionId,
      transferData.to,
      {
        balance: Number(getToAcc.balance) + Number(transferData.amount),
        income: Number(getToAcc.income) + Number(transferData.amount),
      }
    );

    if (!increaseToBalance) throw Error();

    return promise;
  } catch (error) {
    throw Error();
    console.error(error);
  }
}

export async function getCurrentUserTransactions(userId: string) {
  try {
    const promise = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.transactionCollectionId,
      [Query.equal("user", userId), Query.limit(5)]
    );

    if (!promise) throw Error("error while getting user transactions");

    return promise.documents;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllTransactionsOfCurUser(
  userId: string,
  values: string,
  filterResult: string
) {
  try {
    const query = [Query.equal("user", userId)];

    if (values) {
      query.push(Query.lessThanEqual("amount", Number(values)));
    }

    if (filterResult === "today") {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);

      const startOfDay = today.toISOString();
      const endOfDay = new Date(today);
      endOfDay.setDate(today.getDate() + 1);
      endOfDay.setUTCHours(0, 0, 0, 0);
      const endOfToday = endOfDay.toISOString();

      query.push(Query.greaterThanEqual("$createdAt", startOfDay));
      query.push(Query.lessThan("$createdAt", endOfToday));
    }

    if (filterResult === "week") {
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setUTCHours(0, 0, 0, 0);
      startOfWeek.setDate(today.getDate() - today.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 7);
      const startOfWeekISO = startOfWeek.toISOString();
      const endOfWeekISO = endOfWeek.toISOString();

      query.push(Query.greaterThanEqual("$createdAt", startOfWeekISO));
      query.push(Query.lessThan("$createdAt", endOfWeekISO));
    }

    if (filterResult === "month") {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      const startOfMonthISO = startOfMonth.toISOString();
      const endOfMonthISO = endOfMonth.toISOString();

      query.push(Query.greaterThanEqual("$createdAt", startOfMonthISO));
      query.push(Query.lessThan("$createdAt", endOfMonthISO));
    }

    if (filterResult === "year") {
      const today = new Date();
      const startOfYear = new Date(today.getFullYear(), 0, 1);
      const endOfYear = new Date(today.getFullYear() + 1, 0, 1);

      const startOfYearISO = startOfYear.toISOString();
      const endOfYearISO = endOfYear.toISOString();

      query.push(Query.greaterThanEqual("$createdAt", startOfYearISO));
      query.push(Query.lessThan("$createdAt", endOfYearISO));
    }

    const promise = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.transactionCollectionId,
      query
    );

    if (!promise) throw Error("error while getting user transactions");

    return promise.documents;
  } catch (error) {
    console.error(error);
  }
}
