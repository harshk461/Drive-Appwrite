import { database, ID, storage, account } from "@/Utils/appwrite";
import { Permission, Query } from "appwrite";
import toast from "react-hot-toast";

interface Props {
  folderId: string | null;
  file: File;
  name: string;
  email: string | any;
}

export const CreateFolder = async (
  foldername: string,
  parentFolderId?: string | null
) => {
  try {
    const user = await account.get();
    if (!user) throw new Error("User is not authenticated");

    const response = await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_FOLDER_COLLECTION_ID!,
      ID.unique(),
      {
        folderId: ID.unique(), // Unique folder identifier
        folderName: foldername, // Name of the folder
        parentfolderId: parentFolderId, // null for top-level folder, or ID of parent folder
        createdAt: new Date().toISOString(), // Timestamp of folder creation
        email: user.email, // Store user's email for reference
      },
      [Permission.write("any")]
    );

    toast.success("Folder created successfully");
    return response;
  } catch (error) {
    console.error(error);
    toast.error("Failed to create folder");
  }
};

export const UploadFileInFolder = async ({
  folderId,
  file,
  name,
  email,
}: Props) => {
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
    const response = await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
      ID.unique(),
      {
        file: fileResponse.$id,
        name: name,
        type: file.type,
        folderId: folderId || null,
        createdAt: new Date().toISOString(),
        email: email,
        previewUrl: previewUrl.toString(),
      },
      [Permission.write("any")]
    );

    toast.success("File uploaded successfully");
    return response;
  } catch (error) {
    console.error(error);
    toast.error("Failed to upload file");
  }
};

export const DeleteFolder = async ({
  id,
  folderId,
  setFolders,
}: {
  id: string;
  folderId: string;
  setFolders: Function;
}) => {
  try {
    const filesResponse = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
      [Query.equal("folderId", folderId)]
    );

    const deleteFilePromises = filesResponse.documents.map((file) =>
      database.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
        file.$id
      )
    );

    await Promise.all(deleteFilePromises);

    await database.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_FOLDER_COLLECTION_ID!,
      id
    );

    setFolders((prevFolders: any) =>
      prevFolders.filter((folder: any) => folder.$id !== id)
    );

    toast.success("Folder Deleted");
  } catch (e) {
    console.error("Error deleting folder and files:", e);
    toast.error("Failed to delete folder");
  }
};
