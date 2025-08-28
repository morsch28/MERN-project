import { createContext, useState, useEffect } from "react";
import { useAuth } from "./auth.context";
import challengeService from "../services/challengesService";
import { useContext } from "react";

export const challengesContext = createContext();
challengesContext.displayName = "Challenges";

export function ChallengesProvider({ children }) {
  const { user } = useAuth();
  const [myChallenges, setMyChallenges] = useState([]);

  const loadUserChallenges = async () => {
    if (!user?._id) {
      setMyChallenges([]);
      return;
    }
    try {
      const response = await challengeService.getAllUserChallenges(user?._id);
      setMyChallenges(response?.data);
    } catch (error) {
      console.log("Failed load challenges", error);
    }
  };

  useEffect(() => {
    loadUserChallenges();
  }, [user?._id]);

  return (
    <challengesContext.Provider value={{ myChallenges, loadUserChallenges }}>
      {children}
    </challengesContext.Provider>
  );
}

export function useMyChallenges() {
  return useContext(challengesContext);
}
