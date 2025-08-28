import { useEffect, useState } from "react";
import challengesService from "../../services/challengesService";
import AllChallengesCard from "../../components/challenges/AllChallengesCard";
import OptionSelector from "../../components/OptionSelector";
import { useMyChallenges } from "../../context/challenges.context";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/auth.context";
import feedbackService from "../../services/feedbackService";
import { ROUTES } from "../../routes/routes";

function AllChallengesPage() {
  const [challenges, setChallenges] = useState([]);
  const [selectCategory, setSelectCategory] = useState("all");
  const [search, setSearch] = useState("");

  const { myChallenges, loadUserChallenges } = useMyChallenges();
  const { user } = useAuth();

  const navigate = useNavigate();

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

  const base = challenges.filter((ch) => ch.isDeleted === false);

  const filterByCategory =
    selectCategory == "all"
      ? base
      : base.filter((c) => c.category == selectCategory);

  const searchChallenge = filterByCategory.filter((challenge) => {
    const str = challenge?.title.toLowerCase();
    return str.includes(search.trim().toLocaleLowerCase());
  });

  const getStatus = (id) => {
    for (const chosen of myChallenges?.data) {
      if (chosen.challengeId?._id === id) {
        return chosen.status;
      }
    }
    return null;
  };

  const handleDelete = async (id) => {
    const result = await feedbackService.showConfirm({
      text: "Are you sure you wand to delete challenge?",
    });
    if (result.isConfirmed) {
      try {
        const response = await challengesService.deleteChallenge(id);
        if (response.status == 200) {
          await feedbackService.showAlert({
            title: "Ok!",
            text: "Challenge deleted successfully",
            icon: "success",
            timer: 2000,
          });
          setChallenges((prev) => prev.filter((ch) => ch._id !== id));
          await loadUserChallenges();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="mt-3">
      {user?.isAdmin && (
        <button
          onClick={() => navigate("/create-challenge")}
          className="btn btn-warning border border-dark border-1 fs-5  create-challenge"
        >
          Create +
        </button>
      )}

      <div className="d-flex justify-content-center gap-2 challenges-cards">
        <OptionSelector
          options={["all", "fitness", "mental", "nutrition"]}
          onSelected={setSelectCategory}
          selected={selectCategory}
        />

        <input
          type="text"
          className="form-control search-challenge p-2"
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
                  onDelete={handleDelete}
                />
              );
            })}
        </div>
      )}
    </div>
  );
}

export default AllChallengesPage;
