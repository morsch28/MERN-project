import { useEffect, useState } from "react";
import challengesService from "../../services/challengesService";
import AllChallengesCards from "./AllChallengesCards";

function AllChallenges() {
  const [challenges, setChallenges] = useState([]);
  const [selectCategory, setSelectCategory] = useState("all");

  useEffect(() => {
    const loadAllChallenges = async () => {
      try {
        const response = await challengesService.getAllChallenges();
        setChallenges(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadAllChallenges();
  }, []);

  const handleAddChallenge = async (id) => {
    try {
      const addChallenge = await challengesService.addChallengeToList(id);
      return addChallenge;
    } catch (error) {
      console.log(error);
    }
  };

  const filterChallenges =
    selectCategory == "all"
      ? challenges
      : challenges.filter((c) => c.category == selectCategory);

  return (
    <div className="mt-3">
      <div className="d-flex justify-content-center">
        <div className="d-flex gap-3 justify-content-center rounded-2 border-1 p-2 border border-1 border-dark bg-white ">
          {["all", "fitness", "mental", "nutrition"].map((cat) => (
            <button
              key={cat}
              className={`${
                selectCategory == cat ? "btn btn-info" : "btn btn-outline-dark"
              } `}
              onClick={() => setSelectCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
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
