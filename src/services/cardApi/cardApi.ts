import { ID, Query } from "appwrite";
import { appwriteConfig, databases } from "../../appwrite/appwriteConfig";
import { CartType } from "../../types/types";

export async function createCard(newCardData: CartType) {
  try {
    const promise = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.cartCollectionId,
      ID.unique(),
      newCardData
    );

    if (!promise) throw Error("Error while creating card");

    return promise;
  } catch (error) {
    console.error(error);
  }
}

export async function getCard(userId: string) {
  try {
    const promise = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.cartCollectionId,
      [Query.equal("user", userId)]
    );

    if (!promise) throw Error("Error while creating card");

    return promise.documents;
  } catch (error) {
    console.error(error);
  }
}

export async function updateCardInfo(
  documentId: string,
  userName?: string,
  cardName?: string
) {
  try {
    const promise = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.cartCollectionId,
      documentId,
      {
        userName: userName,
        cardName: cardName,
      }
    );

    if (!promise) throw Error("Error");

    return promise;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteCreditCard(documentId: string) {
  try {
    const promise = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.cartCollectionId,
      documentId
    );

    if (!promise) throw Error();

    return promise;
  } catch (error) {
    console.error(error);
  }
}
