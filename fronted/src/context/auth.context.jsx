import { createContext, useContext, useEffect, useState } from "react";
import userServices from "../services/userServices";
import { useNavigate } from "react-router";

export const authContext = createContext();
authContext.displayName = "Auth";

export function AuthProvider({ children }) {
  const [authData, setAuthData] = useState(userServices.getUserFromToken());
  const [wasHereBefore, setWasHereBefore] = useState(false);
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
    try {
      const response = await userServices.signIn(credential);
      setWasHereBefore(true);
      setAuthData(userServices.getUserFromToken());
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const createUser = async (user) => {
    try {
      const response = await userServices.createUser(user);
      if (response.status == 201) {
        await login({ email: user.email, password: user.password });
        return { status: true };
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    userServices.logout();
    setAuthData(null);
    setUser(null);
    setWasHereBefore(true);
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
        wasHereBefore,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}
