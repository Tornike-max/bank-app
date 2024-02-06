import { ID, Query } from "appwrite";
import {
  account,
  appwriteConfig,
  avatars,
  databases,
} from "../../appwrite/appwriteConfig";

export async function loginUser(email: string, password: string) {
  try {
    const promise = await account.createEmailSession(email, password);
    if (!promise) throw new Error("Error while login! Please try again");

    return promise;
  } catch (error) {
    console.error(error);
  }
}

export async function registerUser(
  email: string,
  password: string,
  name: string,
  username: string
) {
  try {
    console.log(email, password, name);
    const promise = await account.create(ID.unique(), email, password, name);

    if (!promise) throw Error();

    const imageUrl = avatars.getInitials(name);

    const saveUser = await saveUserToDB({
      name: promise.name,
      username: username,
      email: promise.email,
      imageId: crypto.randomUUID(),
      accountId: promise.$id,
      imageUrl,
      phone: promise && promise?.phone,
    });

    const createAcc = await createNewUserAccount({
      user: saveUser?.$id,
      balance: 0,
      income: 0,
      outcome: 0,
      loan: 0,
      currency: "GEL",
      status: true,
    });

    if (!createAcc) throw Error("Error while craeting account for user");

    if (saveUser) {
      return saveUser;
    }

    return promise;
  } catch (error) {
    console.error(error);
  }
}

export async function saveUserToDB({
  name,
  username,
  email,
  imageUrl,
  accountId,
  imageId,
  phone,
}: {
  name: string;
  username: string;
  email: string;
  imageUrl: URL;
  accountId: string;
  imageId: string;
  phone: string | number;
}) {
  try {
    const promise = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        name,
        username,
        email,
        imageUrl,
        accountId,
        imageId,
        phone,
      }
    );
    if (!promise) throw new Error("Error while adding user to db");

    return promise;
  } catch (error) {
    console.error(error);
  }
}

export async function createNewUserAccount({
  user,
  balance,
  income,
  outcome,
  loan,
  currency,
  status,
}: {
  user: string | undefined;
  balance: number;
  income: number;
  outcome: number;
  loan: number;
  currency: string;
  status: boolean;
}) {
  try {
    const promise = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.accountCollectionId,
      ID.unique(),
      {
        user,
        balance,
        income,
        outcome,
        loan,
        currency,
        status,
      }
    );

    if (!promise) throw Error("Error while create register user account");

    return promise;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserFromDB() {
  try {
    const currentAccount = await account?.get();
    if (!currentAccount) return;

    const promise = await databases?.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount?.$id)]
    );

    if (!promise) throw Error("Error while getting user from db");

    return promise?.documents[0];
  } catch (error) {
    console.error(error);
  }
}

export async function logoutApi(documentId: string) {
  try {
    const promise = await account.deleteSessions();

    if (promise) {
      const deleteFromDB = await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        documentId
      );

      return deleteFromDB;
    }
    return promise;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteUser(documentId: string) {
  try {
    const promise = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      documentId
    );

    if (!promise) throw Error("Error while deleting user");

    return promise;
  } catch (error) {
    console.error(error);
  }
}

export async function changePassword(
  password: string,
  oldPassword?: string | undefined
) {
  try {
    const promise = await account.updatePassword(password, oldPassword);

    if (!promise) throw Error("Error while changing password");

    return password;
  } catch (error) {
    console.error(error);
  }
}
