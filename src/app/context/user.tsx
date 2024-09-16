"use client";

import { createContext, useEffect, useState } from "react";

import { fetchLogout, fetchMe } from "@/app/lib/api/users";
import { User } from "@/app/lib/definitions";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchMe().then((data) => {
      if (!data.error) {
        setUser(data?.user || null);
      }
    });
  }, []);

  const logout = () => {
    fetchLogout().then((data) => {
      if (!data.error) {
        setUser(null);
      }
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
