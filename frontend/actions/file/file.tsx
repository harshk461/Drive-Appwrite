import { database, ID, storage, account } from "@/Utils/appwrite";
import { Permission, Query } from "appwrite";
import toast from "react-hot-toast";

interface Props {
  file: File;
  name: string;
  email: string;
}

export const AddNewFile = async ({ file, name, email }: Props) => {
  try {
    // Ensure the user is authenticated
    const user = await account.get();
    if (!user) {
      throw new Error("User is not authenticated");
    }

    // Upload the file to Appwrite Storage
    const fileResponse = await storage.createFile(
      process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
      ID.unique(),
      file
    );

    // Generate the preview URL
    const previewUrl = storage.getFilePreview(
      process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
      fileResponse.$id,
      400, // width of the preview, adjust as needed
      400 // height of the preview, adjust as needed
    );

    // Define permissions for the document
    const permissions = {
      read: `user:${user.$id}`,
      write: `user:${user.$id}`,
      update: `user:${user.$id}`,
      delete: `user:${user.$id}`,
    };

    // Create a document in the Appwrite Database with read/write permissions
    await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
      ID.unique(),
      {
        file: fileResponse.$id,
        name: name,
        type: file.type,
        createdAt: new Date().toISOString(),
        email: email,
        previewUrl: previewUrl.toString(),
      },
      [Permission.write("any")]
    );

    toast.success("File uploaded successfully");
  } catch (error) {
    console.error(error);
    toast.error("Failed to upload file");
  }
};
export const getAllData = async () => {
  try {
    // Ensure the user is authenticated
    const user = await account.get();
    if (!user) {
      throw new Error("User is not authenticated");
    }
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
      [Query.equal("email", user.email)]
    );

    // console.log(response);
    return response.documents;
  } catch (e) {
    console.log(e);
  }
};

export const DeleteFile = async (id: string) => {
  try {
    await database.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
      id
    );
    toast.success("File deleted successfully");
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete file");
  }
};

export const UpdateFileName = async (id: string, name: string) => {
  try {
    await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
      id,
      {
        name: name,
      }
    );
    toast.success("File name updated successfully");
  } catch (error) {
    console.error(error);
    toast.error("Failed to update file name");
  }
};

export const UpdateFile = async (id: string, file: File) => {
  try {
    const fileResponse = await storage.createFile(
      process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
      ID.unique(),
      file
    );

    const previewUrl = storage.getFilePreview(
      process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
      fileResponse.$id,
      400,
      400
    );

    await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
      id,
      {
        file: fileResponse.$id,
        type: file.type,
        previewUrl: previewUrl.toString(),
      }
    );
    toast.success("File updated successfully");
  } catch (error) {
    console.error(error);
    toast.error("Failed to update file");
  }
};

export const DownloadFile = async (id: string) => {
  try {
    const response = await database.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
      id
    );

    const file = storage.getFileDownload(
      process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
      response.file
    );
    // console.log(file);
    // const url = URL.createObjectURL(file.href);
    // const a = document.createElement("a");
    // a.href = url;
    // a.download = response.name;
    // a.click();
    window.open(file.toString());
  } catch (error) {
    console.error(error);
    toast.error("Failed to download file");
  }
};

export const GetFileView = async (id: string) => {
  try {
    const res = await storage.getFileView(
      process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
      id
    );
    window.open(res.href);
  } catch (e) {
    console.log(e);
  }
};

export const StarFile = async (id: string) => {
  try {
    await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
      id,
      {
        starred: true,
      }
    );
    toast.success("File starred successfully");
  } catch (e) {
    console.log(e);
    toast.error("Failed to star file");
  }
};

export const GetAllStarredFile = async () => {
  try {
    const user = await account.get();
    if (!user) {
      toast.error("User is not authenticated");
    }
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
      [Query.equal("starred", true), Query.equal("email", user.email)]
    );

    return response.documents;
  } catch (e) {
    console.log(e);
    toast.error("Failed to get starred files");
  }
};

export const UnStartFile = async (id: string) => {
  try {
    await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
      id,
      {
        starred: false,
      }
    );
    toast.success("File unstarred successfully");
  } catch (e) {
    console.log(e);
    toast.error("Failed to unstar file");
  }
};
