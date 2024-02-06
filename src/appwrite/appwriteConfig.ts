import { Account, Avatars, Client, Databases, Storage } from "appwrite";

const client = new Client();

export const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID as string,
  endPoint: import.meta.env.VITE_APPWRITE_ENDPOINT as string,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID as string,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID as string,
  userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID as string,
  accountCollectionId: import.meta.env
    .VITE_APPWRITE_ACCOUNT_COLLECTION_ID as string,
  settingCollectionId: import.meta.env
    .VITE_APPWRITE_SETTINGS_COLLECTION_ID as string,
  loanCollectionId: import.meta.env.VITE_APPWRITE_LOANS_COLLECTION_ID as string,
  debitsCollectionId: import.meta.env
    .VITE_APPWRITE_DEBITS_COLLECTION_ID as string,
  creditCollectionId: import.meta.env
    .VITE_APPWRITE_CREDITS_COLLECTION_ID as string,
  transactionCollectionId: import.meta.env
    .VITE_APPWRITE_TRANSACTIONS_COLLECTION_ID as string,
  cartCollectionId: import.meta.env.VITE_APPWRITE_CART_COLLECTION_ID as string,
  goalCollectionId: import.meta.env.VITE_APPWRITE_GOAL_COLLECTION_ID as string,
};

client
  .setEndpoint(appwriteConfig.endPoint)
  .setProject(appwriteConfig.projectId);

export const databases = new Databases(client);
export const account = new Account(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
