import { createContext, useContext, useEffect, useState } from "react";
import userServices from "../services/userServices";

export const authContext = createContext();
authContext.displayName = "Auth";

export function AuthProvider({ children }) {
  const [authData, setAuthData] = useState(userServices.getUserFromToken());
  const [user, setUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    userServices.refreshToken();
    if (authData) {
      const loadUser = async () => {
        try {
          const userId = await userServices.getUserById(authData._id);
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
    const response = await userServices.signIn(credential);
    setAuthData(userServices.getUserFromToken());
    return response;
  };

  const createUser = async (user) => {
    const response = await userServices.createUser(user);
    if (response.status == 201) {
      setAuthData(userServices.getUserFromToken());
      return { status: true };
    }
    return { status: false, msg: response.message };
  };

  const logout = () => {
    userServices.logout();
    setAuthData(null);
    setUser(null);
    // setUser(userServices.getUserFromToken());
  };

  return (
    <authContext.Provider
      value={{
        user,
        login,
        logout,
        authData,
        isLoading,
        createUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}
