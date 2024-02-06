import { ID, Query } from "appwrite";
import {
  account,
  appwriteConfig,
  databases,
  storage,
} from "../../appwrite/appwriteConfig";

export async function getProfile() {
  try {
    const currentAccount = await account?.get();
    if (!currentAccount) return;

    console.log(currentAccount);
    const promise = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!promise) throw Error("Error while getting current user");

    return promise.documents[0];
  } catch (error) {
    console.error(error);
  }
}

export async function changeProfile({
  userId,
  file,
}: {
  userId: string;
  file: File;
}) {
  try {
    const uploadedFile = await createPicture(file);

    if (!uploadedFile) {
      throw new Error("File upload failed");
    }

    console.log(uploadedFile);
    const fileUrl = getFilePreview(uploadedFile.$id);

    if (!fileUrl) {
      throw new Error("Could not find file in preview");
    }
    console.log(fileUrl);

    console.log(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId
    );
    const newImage = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
      {
        imageUrl: fileUrl,
      }
    );

    console.log(newImage);
    return newImage;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createPicture(file: File) {
  try {
    const promise = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    if (!promise) {
      throw new Error("Could not create File");
    }

    return promise;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      "top",
      100
    );

    if (!fileUrl) {
      throw new Error("This couses error");
    }

    return fileUrl;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateUserName(
  name: string,
  email: string,
  userId: string
) {
  try {
    const getCurAcc = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId
    );

    if (!getCurAcc) throw Error("Can't find user");

    const promise = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
      {
        name: name === "" ? getCurAcc.name : name,
        email: email === "" ? getCurAcc.email : email,
      }
    );

    if (!promise) throw Error("Error while changing");

    return promise;
  } catch (error) {
    console.error(error);
  }
}

export async function changeUserPhone(userId: string, phone: string) {
  try {
    const curAcc = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId
    );

    if (!curAcc) throw Error("Error while getting cur acc");

    const promise = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId,
      {
        phone: phone === "" ? curAcc.phone : phone,
      }
    );

    return promise;
  } catch (error) {
    console.error(error);
  }
}
