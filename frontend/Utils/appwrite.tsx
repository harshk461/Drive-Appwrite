import { Client, Account, Storage, Databases } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!); // Your project ID

export const account = new Account(client);
export const storage = new Storage(client);
export const database = new Databases(client);
export { ID } from "appwrite";

export const getUser = async () => {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
