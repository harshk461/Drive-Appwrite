import { Client, Account } from "appwrite";

const id: string = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject(id); // Your project ID

export const account = new Account(client);
export { ID } from "appwrite";
