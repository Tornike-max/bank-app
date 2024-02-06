import { appwriteConfig, databases } from "../../appwrite/appwriteConfig";
import { SettingsType } from "../../types/types";

export async function getSettings() {
  try {
    const promise = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.settingCollectionId
    );

    if (!promise) throw Error("Error while getting settings");

    return promise.documents[0];
  } catch (error) {
    console.error(error);
  }
}

export async function updateSettings({
  documentId,
  updateData,
}: {
  documentId: string;
  updateData: SettingsType;
}) {
  try {
    const promise = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.settingCollectionId,
      documentId,
      updateData
    );

    if (!promise) throw Error("Error while updating document");

    return promise;
  } catch (error) {
    console.error(error);
  }
}
