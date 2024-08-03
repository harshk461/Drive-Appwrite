"use client";

import { getUser } from "@/Utils/appwrite";
import { Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Navbar() {
  const { setTheme } = useTheme();
  const [theme, setThemeState] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      setThemeState(storedTheme);
    }

    getUser().then((user) => {
      setUser(user);
    });
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

  return (
    <div className="w-full flex items-center px-8 py-6 justify-between">
      <Link href={"/"} className="text-2xl font-semibold">
        Drive
      </Link>
      <div className="flex items-center">
        {theme !== "dark" ? (
          <Sun onClick={handleTheme} size={40} />
        ) : (
          <Moon onClick={handleTheme} size={40} />
        )}
        <User size={40} />
        {user === null && (
          <div className="flex gap-2">
            <Link href={"/auth/sign-up"}>Register</Link>
            <h1>|</h1>
            <Link href={"/auth/login"}>Login</Link>
          </div>
        )}
      </div>
    </div>
  );
}
