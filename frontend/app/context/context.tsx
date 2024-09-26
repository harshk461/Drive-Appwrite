// contexts/UserContext.tsx

import React, { createContext, useContext, useEffect, useState } from "react";
import { getUser, account } from "@/Utils/appwrite"; // Adjust the path as needed

interface User {
  id: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  logout: () => void; // Add logout function to context
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData: any = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user data", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await account.deleteSession("current"); // Assuming you use Appwrite for authentication
      setUser(null); // Clear user state
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
