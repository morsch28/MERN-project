import { useEffect, useState } from "react";
import challengesService from "../../services/challengesService";
import AllChallengesCards from "../../components/challenges/AllChallengesCards";
import OptionSelector from "../../components/OptionSelector";

function AllChallenges() {
  const [challenges, setChallenges] = useState([]);
  const [selectCategory, setSelectCategory] = useState("all");

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

  return (
    <div className="mt-3">
      <div className="d-flex justify-content-center">
        <OptionSelector
          options={["all", "fitness", "mental", "nutrition"]}
          onSelected={setSelectCategory}
          selected={selectCategory}
        />
      </div>
      <div className=" container challengesContainer">
        {filterChallenges.length > 0 &&
          filterChallenges.map((challenge) => (
            <AllChallengesCards key={challenge._id} challenge={challenge} />
          ))}
      </div>
    </div>
  );
}

export default AllChallenges;
