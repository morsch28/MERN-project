import { createContext, useContext, useEffect, useState } from "react";
import userServices from "../services/userServices";

export const authContext = createContext();
authContext.displayName = "Auth";

export function AuthProvider({ children }) {
  const [authData, setAuthData] = useState(userServices.getUserFromToken());
  const tokenUser = userServices.getUserFromToken();
  console.log("Initial authData from token:", tokenUser);

  const [user, setUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    userServices.refreshToken();
    if (authData) {
      console.log("auth data :", authData);
      const loadUser = async () => {
        try {
          const userId = await userServices.getUserById(authData._id);
          console.log("User from server:", userId);
          setUser(userId);
          return userId;
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };
      loadUser();
    } else {
      setIsLoading(false);
    }
  }, [authData]);

  const login = async (credential) => {
    try {
      const response = await userServices.signIn(credential);
      setAuthData(userServices.getUserFromToken());
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    userServices.logout();
    setUser(userServices.getUserFromToken());
  };

  return (
    <authContext.Provider value={{ user, login, logout, authData, isLoading }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}
