import { useEffect, useState } from "react";
import challengesService from "../../services/challengesService";
import AllChallengesCard from "../../components/challenges/AllChallengesCard";
import OptionSelector from "../../components/OptionSelector";
import { useMyChallenges } from "../../context/challenges.context";
import "./challenges.css";

function AllChallengesPage() {
  const [challenges, setChallenges] = useState([]);
  const [selectCategory, setSelectCategory] = useState("all");
  const [search, setSearch] = useState("");

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

  const filterByCategory =
    selectCategory == "all"
      ? challenges
      : challenges.filter((c) => c.category == selectCategory);

  const searchChallenge = filterByCategory.filter((challenge) => {
    const str = challenge?.title.toLowerCase();
    return str.includes(search.trim().toLocaleLowerCase());
  });

  const getStatus = (id) => {
    for (const chosen of myChallenges.data) {
      if (chosen.challengeId?._id === id) {
        return chosen.status;
      }
    }
    return null;
  };

  return (
    <div className="mt-3">
      <div className="d-flex justify-content-center gap-2 challenges-cards">
        <OptionSelector
          options={["all", "fitness", "mental", "nutrition"]}
          onSelected={setSelectCategory}
          selected={selectCategory}
        />

        <input
          type="text"
          className="form-control w-25"
          placeholder="search by challenge title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
      </div>
      {myChallenges.data && (
        <div className=" container challengesContainer">
          {searchChallenge.length > 0 &&
            searchChallenge.map((challenge) => {
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
