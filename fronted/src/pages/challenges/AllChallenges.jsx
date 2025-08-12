import { useEffect, useState } from "react";
import challengesService from "../../services/challengesService";
import AllChallengesCards from "../../components/challenges/AllChallengesCards";
import OptionSelector from "../../components/OptionSelector";
import { useAuth } from "../../context/auth.context";
import { useUserChallenges } from "../../hooks/useUserChallenges";

function AllChallenges() {
  const [challenges, setChallenges] = useState([]);
  const [selectCategory, setSelectCategory] = useState("all");
  const { user } = useAuth();
  const { chosenChallenges, loadUserChallenges } = useUserChallenges(user._id);

  useEffect(() => {
    const loadAllChallenges = async () => {
      try {
        const response = await challengesService.getAllChallenges();
        const list = response?.data?.data || [];
        setChallenges(list);
      } catch (error) {
        console.log(error);
      }
    };
    loadAllChallenges();
  }, []);

  const filterChallenges =
    selectCategory == "all"
      ? challenges
      : challenges.filter((c) => c.category == selectCategory);

  console.log("all card", chosenChallenges);

  const getStatus = (id) => {
    for (const chosen of chosenChallenges?.data) {
      if (chosen.challengeId?._id === id) {
        return chosen.status;
      }
    }
    return null;
  };

  return (
    <div className="mt-3">
      <div className="d-flex justify-content-center">
        <OptionSelector
          options={["all", "fitness", "mental", "nutrition"]}
          onSelected={setSelectCategory}
          selected={selectCategory}
        />
      </div>
      {chosenChallenges.data && (
        <div className=" container challengesContainer">
          {filterChallenges.length > 0 &&
            filterChallenges.map((challenge) => {
              let status = getStatus(challenge._id);
              return (
                <AllChallengesCards
                  key={challenge._id}
                  challenge={challenge}
                  isChosen={chosenChallenges.data.some((ch) => {
                    if (ch.challengeId._id == challenge._id) {
                      return true;
                    }
                    return false;
                  })}
                  onAdd={loadUserChallenges}
                  status={status}
                />
              );
            })}
        </div>
      )}
    </div>
  );
}

export default AllChallenges;
