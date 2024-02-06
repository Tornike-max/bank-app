import { createContext, useEffect, useState } from "react";
import { getUserFromDB } from "../services/userAuthApi/userApi";
import { Models } from "appwrite";

type UserType = {
  email: string;
  name: string;
  username: string;
  id: string;
  imageUrl: string;
  phone: string | number;
  accountId: string;
};

type AuthContextType = {
  user: UserType | null;
  isLoading: boolean;
  userFromDb: Models.Document | null;
  checkAuthUser: () => Promise<boolean>;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  userFromDb: null,
  checkAuthUser: async () => false as boolean,
  isAuthenticated: false,
});

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserType | null>(null);
  const [userFromDb, setUserFromDb] = useState<Models.Document | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem("cookieFallback") === "[]" ||
      localStorage.getItem("cookieFallback") === null
    ) {
      //   navigate("/login");
    }
    checkAuthUser();
  }, []);

  async function checkAuthUser() {
    try {
      setIsLoading(true);
      const getSessionId = localStorage.getItem("cookieFallback");
      const authUser = await getUserFromDB();
      if (authUser) {
        setUser({
          id: authUser.$id,
          name: authUser.name,
          username: authUser?.username,
          email: authUser.email,
          imageUrl: authUser.imageUrl,
          phone: authUser.phone,
          accountId: authUser.accountId,
        });

        if (
          getSessionId !== "[]" &&
          getSessionId !== null &&
          getSessionId.includes("a_session_")
        ) {
          setUserFromDb(authUser);
          setIsAuthenticated(true);
        }
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  const AuthObj: AuthContextType = {
    user,
    isLoading,
    userFromDb,
    isAuthenticated,
    checkAuthUser,
  };

  return (
    <AuthContext.Provider value={AuthObj}>{children}</AuthContext.Provider>
  );
}
