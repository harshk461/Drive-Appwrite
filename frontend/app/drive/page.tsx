"use client";

import React, { useEffect, useState } from "react";
import { database, account, getUser } from "@/Utils/appwrite"; // Import Appwrite SDK
import { Query } from "appwrite";
import FileTile from "@/component/FileTile";
import FolderTile from "@/component/FolderTile";
import { useUser } from "../context/context";

export default function Drive() {
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  // Get all folders for the authenticated user
  const getFolders = async () => {
    try {
      const user = await account.get(); // Ensure user is authenticated
      if (!user) throw new Error("User is not authenticated");

      const response = await database.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_FOLDER_COLLECTION_ID!,
        [Query.equal("email", user.email), Query.isNull("parentfolderId")]
      );

      return response.documents;
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
      return response.documents;
    } catch (error) {
      console.error("Failed to fetch files", error);
    }
  };

  // Fetch files and folders when user is available
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      setLoading(true);
      const f: any = await getFolders();
      const fl: any = await getFiles();

      setFolders(f || []); // Ensure we don't pass undefined to state
      setFiles(fl || []);

      setLoading(false);
    };

    fetchData(); // Call the fetchData function
  }, [user]);

  return (
    <div className="w-full p-6 rounded-2xl bg-white dark:bg-[#131314]">
      {!user ? (
        <div className="text-2xl font-semibold text-white py-8 text-center">
          Please log in to access your files.
        </div>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1 className="text-lg font-semibold">Folders</h1>
          {folders.length > 0 ? (
            folders.map((item, index) => (
              <FolderTile setFolders={setFolders} key={index} folder={item} />
            ))
          ) : (
            <p>No folders found.</p>
          )}

          <h1 className="text-lg font-semibold mt-4">Files</h1>
          {files.length > 0 ? (
            files.map((item, index) => <FileTile key={index} file={item} />)
          ) : (
            <p>No files found.</p>
          )}
        </div>
      )}
    </div>
  );
}
