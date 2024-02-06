import { ID, Query } from "appwrite";
import { appwriteConfig, databases } from "../../appwrite/appwriteConfig";
import { GoalType } from "../../types/types";

export async function createFinancialGoal(goalData: GoalType) {
  try {
    const promise = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.goalCollectionId,
      ID.unique(),
      goalData
    );

    if (!promise) throw Error("Error while creating goal");

    return promise;
  } catch (error) {
    console.error(error);
    throw new Error("Error occured in goalsApi");
  }
}

export async function getGoals(userId: string) {
  try {
    const promise = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.goalCollectionId,
      [Query.equal("user", userId)]
    );

    if (!promise) throw Error("Error while getting data from goals table");

    return promise.documents;
  } catch (error) {
    console.error(error);
    throw new Error("Error occured in goalsApi");
  }
}

export async function updateGoal(
  documentId: string,
  newValue: number,
  remainingAmount: number
) {
  try {
    const promise = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.goalCollectionId,
      documentId,
      {
        sliderAmount: newValue,
        remainingAmount: remainingAmount,
      }
    );

    if (!promise) throw Error();

    return promise;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteGoalApi(documentId: string) {
  try {
    const promise = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.goalCollectionId,
      documentId
    );

    if (!promise) throw Error("Error while deleting goal");

    return promise;
  } catch (error) {
    console.error(error);
  }
}
