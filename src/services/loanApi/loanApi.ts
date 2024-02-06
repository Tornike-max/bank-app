import { ID, Query } from "appwrite";
import { appwriteConfig, databases } from "../../appwrite/appwriteConfig";
import { LoanRequestType } from "../../types/types";

export async function createLoan(
  loanData: LoanRequestType,
  accountId: string,
  loanAmount: number
) {
  try {
    const promise = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.loanCollectionId,
      ID.unique(),
      loanData
    );

    if (!promise) throw Error();

    const getCurAcc = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.accountCollectionId,
      accountId
    );

    if (!getCurAcc) throw Error("Error");

    const createLoan = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.accountCollectionId,
      accountId,
      {
        balance: Number(getCurAcc.balance) + Number(loanAmount),
        income: Number(getCurAcc.income) + Number(loanAmount),
        loan: Number(getCurAcc.loan) + Number(loanAmount),
      }
    );

    if (!createLoan) throw Error("Cant Make a loan");

    return promise;
  } catch (error) {
    console.error(error);
  }
}

export async function getLoanData(documentId: string) {
  try {
    const promise = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.loanCollectionId,
      [Query.equal("user", documentId)]
    );

    if (!promise) throw Error("Error while getting loan data");

    return promise.documents[0];
  } catch (error) {
    console.error(error);
  }
}

export async function payLoan(
  documentId: string,
  accountId: string,
  loanValue: number,
  loanAmount: number,
  loanPercentage: number,
  leftToPay: number,
  currentBalance: number,
  currentOutcome: number,
  settingsLoanPercentage: number
) {
  console.log(accountId);
  console.log(loanAmount, "loanAmount");
  console.log(loanValue, "loanValue");
  console.log(loanPercentage, "percent");
  console.log(currentBalance, "balance");
  try {
    const promise = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.loanCollectionId,
      documentId,
      {
        moneyToPay: loanValue,
        leftToPay: leftToPay,
      }
    );

    if (!promise) throw Error("Error while Paying loan");

    const addInAccount = await databases?.updateDocument(
      appwriteConfig?.databaseId,
      appwriteConfig?.accountCollectionId,
      accountId,
      {
        loan: loanAmount + settingsLoanPercentage - leftToPay,
        income: loanAmount,
        outcome: currentOutcome + loanValue,
        balance:
          loanValue > currentBalance
            ? currentBalance
            : currentBalance - loanValue,
      }
    );

    if (!addInAccount) throw Error("Error while paying loan");

    return promise;
  } catch (error) {
    console.error(error);
  }
}
