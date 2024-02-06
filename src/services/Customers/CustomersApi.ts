import { appwriteConfig, databases } from "../../appwrite/appwriteConfig";

export async function getAllCustomers() {
  try {
    const promise = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId
    );

    if (!promise) throw Error();

    return promise.documents;
  } catch (error) {
    console.error(error);
  }
}

export async function getSingleCustomer(customerId: string) {
  customerId;
  try {
    const promise = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      customerId
    );

    if (!promise) throw Error("Error while getting user");

    return promise;
  } catch (error) {
    console.error(error);
  }
}
