import { useEffect, useState } from "react";
import challengeService from "../services/challengesService";

export function useUserChallenges(userId) {
  const [chosenChallenges, setChosenChallenges] = useState([]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const loadUserChallenges = async () => {
      const response = await challengeService.getAllUserChallenges(userId);
      console.log("response", response);
      setChosenChallenges(response.data);
    };
    loadUserChallenges();
  }, [userId]);

  return chosenChallenges;
}
