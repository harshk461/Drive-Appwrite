"use client";

import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/component/Navbar";
import { ThemeProvider } from "next-themes";
import NewFile from "@/component/NewFile";
import { useState } from "react";
import { Plus, Home, HardDrive, Star } from "lucide-react";
import Link from "next/link";
import NewFolder from "@/component/NewFolder";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [newFileDisplay, setNewFileDisplay] = useState(false);
  const [newFolder, setNewFolder] = useState(false);

  return (
    <html suppressHydrationWarning lang="en">
      <title>Drive Clone</title>
      <body className="flex flex-col">
        <ThemeProvider attribute="class">
          <Navbar />
          <div className="w-full h-full flex lg:flex-row flex-col items-start justify-center p-6 gap-4">
            <div className="w-1/4">
              <div className="flex gap-4 items-center w-full">
                <button
                  onClick={() => setNewFileDisplay(true)}
                  className="w-full px-4 py-2 text-xl font-semibold bg-[#C2E7FF] rounded-lg flex items-center dark:bg-gray-700"
                >
                  <Plus />
                  New
                </button>
                <button
                  onClick={() => setNewFolder(true)}
                  className="w-3/4 px-4 py-2 text-xl font-semibold bg-[#C2E7FF] rounded-lg flex items-center dark:bg-gray-700"
                >
                  <Plus />
                  New Folder
                </button>
              </div>
              <Link
                href="/"
                className="w-full px-8 py-2 flex gap-2 items-center mt-3 bg-[#C2E7FF]  rounded-lg dark:bg-gray-700"
              >
                <Home />
                <h1 className="text-lg font-medium">Home</h1>
              </Link>

              <Link
                href="/drive"
                className="w-full px-8 py-2 flex gap-2 items-center mt-3 bg-[#C2E7FF] rounded-lg dark:bg-gray-700"
              >
                <HardDrive />
                <h1 className="text-lg font-medium">Drive</h1>
              </Link>

              <Link
                href="/starred"
                className="w-full px-8 py-2 flex gap-2 items-center mt-3 bg-[#C2E7FF]  rounded-lg dark:bg-gray-700"
              >
                <Star />
                <h1 className="text-lg font-medium">Starred</h1>
              </Link>
            </div>
            <div className="w-full">{children}</div>
          </div>
          <Toaster position="top-right" />
          {newFileDisplay && (
            <NewFile
              setIsOpen={setNewFileDisplay}
              setFiles={null}
              folderId={null}
            />
          )}
          {newFolder && (
            <NewFolder
              setFolders={null}
              parentFolder={null}
              setIsOpen={setNewFolder}
            />
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
