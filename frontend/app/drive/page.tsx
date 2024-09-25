"use client";

import React, { useEffect, useState } from "react";
import { database, account } from "@/Utils/appwrite"; // Import Appwrite SDK
import { Query } from "appwrite";
import FileTable from "@/component/FileTable";
import FileTile from "@/component/FileTile";
import FolderTile from "@/component/FolderTile";

export default function Drive() {
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFolders = async () => {
    try {
      const user = await account.get(); // Ensure user is authenticated
      console.log(user);
      if (!user) throw new Error("User is not authenticated");

      const response = await database.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_FOLDER_COLLECTION_ID!, // Replace with correct collection ID for folders
        [Query.equal("email", user.email), Query.isNull("parentfolderId")] // Query to get folders for the user
      );

      console.log(response);
      setFolders(response.documents); // Set folders in state
    } catch (error) {
      console.error("Failed to fetch folders", error);
    }
  };

  // Get all files for the authenticated user
  const getFiles = async () => {
    try {
      const user = await account.get(); // Ensure user is authenticated
      if (!user) throw new Error("User is not authenticated");

      const response = await database.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!, // Replace with correct collection ID for files
        [Query.equal("email", user.email), Query.isNull("folderId")] // Query to get files for the user
      );
      setFiles(response.documents); // Set files in state
    } catch (error) {
      console.error("Failed to fetch files", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getFolders();
    getFiles();
    setLoading(false);
  }, []);

  return (
    <div className="w-full p-6 rounded-2xl bg-white">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1 className="text-lg font-semibold">Folders</h1>
          {folders.length > 0 &&
            folders.map((item, index) => (
              <FolderTile key={index} folder={item} />
            ))}
          <h1 className="text-lg font-semibold">Files</h1>
          {files.length > 0 &&
            files.map((item, index) => <FileTile key={index} file={item} />)}
        </div>
      )}
    </div>
  );
}
