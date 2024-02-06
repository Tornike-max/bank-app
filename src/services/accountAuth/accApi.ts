import { Query } from "appwrite";
import { appwriteConfig, databases } from "../../appwrite/appwriteConfig";
import { getUserFromDB } from "../userAuthApi/userApi";

export async function getUserAcc() {
  try {
    const currentUser = await getUserFromDB();

    if (currentUser) {
      const promise = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.accountCollectionId,
        [Query.equal("user", currentUser.$id)]
      );
      if (!promise) throw Error("Error while getting account data");

      return promise.documents;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getNotCurUser(userId: string) {
  try {
    const promise = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.accountCollectionId,
      [Query.equal("user", userId)]
    );
    if (!promise) throw Error("Error while getting account data");

    return promise.documents[0];
  } catch (error) {
    console.error(error);
  }
}
