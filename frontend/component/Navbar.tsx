"use client";

import { logoutUser } from "@/actions/auth/auth";
import { useUser } from "@/app/context/context";
import { getUser } from "@/Utils/appwrite";
import { Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Navbar() {
  const { setTheme } = useTheme();
  const [theme, setThemeState] = useState<string | null>(null);
  const { user, logout }: any = useUser();
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      setThemeState(storedTheme);
    }
  }, []);

  const handleTheme = () => {
    if (!theme) {
      localStorage.setItem("theme", "light");
      setThemeState("light");
      setTheme("light");
    } else if (theme === "system" || theme === "dark") {
      localStorage.setItem("theme", "light");
      setThemeState("light");
      setTheme("light");
    } else {
      localStorage.setItem("theme", "dark");
      setThemeState("dark");
      setTheme("dark");
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/auth/login");
  };
  return (
    <div className="w-full flex items-center px-8 py-6 justify-between">
      <Link href={"/"} className="text-2xl font-semibold">
        Drive
      </Link>
      <div className="flex items-center relative">
        {theme !== "dark" ? (
          <Sun onClick={handleTheme} size={40} />
        ) : (
          <Moon onClick={handleTheme} size={40} />
        )}
        {user === null ? (
          <div className="flex gap-2 ml-2">
            <Link href={"/auth/sign-up"}>Register</Link>
            <h1>|</h1>
            <Link href={"/auth/login"}>Login</Link>
          </div>
        ) : (
          <div className="relative">
            <div
              onClick={toggleDropdown}
              className="flex gap-2 items-center cursor-pointer text-lg font-semibold"
            >
              <User size={40} />
              <h1>{user.name}</h1>
            </div>
            {dropdownVisible && (
              <div className="absolute right-0 mt-2 w-48 dark:bg-gray-600 shadow-lg rounded-lg">
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-md hover:bg-gray-800 w-full text-start rounded-lg"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
