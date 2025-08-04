import { useEffect, useState } from "react";
import challengeService from "../services/challengesService";

export function useUserChallenges(userId) {
  const [chosenChallenges, setChosenChallenges] = useState([]);

  const loadUserChallenges = async () => {
    if (!userId) {
      return;
    }
    try {
      const response = await challengeService.getAllUserChallenges(userId);
      console.log("response", response);
      setChosenChallenges(response.data);
    } catch (error) {
      console.log("Failed load challenges", error);
    }
  };

  useEffect(() => {
    loadUserChallenges();
  }, [userId]);

  return { chosenChallenges, loadUserChallenges };
}
