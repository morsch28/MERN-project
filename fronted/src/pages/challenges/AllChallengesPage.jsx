import { useEffect, useState } from "react";
import challengesService from "../../services/challengesService";
import AllChallengesCard from "../../components/challenges/AllChallengesCard";
import OptionSelector from "../../components/OptionSelector";
import { useMyChallenges } from "../../context/challenges.context";

function AllChallengesPage() {
  const [challenges, setChallenges] = useState([]);
  const [selectCategory, setSelectCategory] = useState("all");

  const { myChallenges, loadUserChallenges } = useMyChallenges();

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

  console.log("all card", myChallenges);

  const getStatus = (id) => {
    for (const chosen of myChallenges?.data) {
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
      {myChallenges.data && (
        <div className=" container challengesContainer">
          {filterChallenges.length > 0 &&
            filterChallenges.map((challenge) => {
              let status = getStatus(challenge._id);
              return (
                <AllChallengesCard
                  key={challenge._id}
                  challenge={challenge}
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

export default AllChallengesPage;
