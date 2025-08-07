import challengesService from "../../services/challengesService";
import CategoryIcons from "./CategoryIcons";
import DifficultyBadge from "./DifficultyBadge";

function AllChallengesCards({ challenge }) {
  const handleAddChallenge = async (id) => {
    try {
      const addChallenge = await challengesService.addChallengeToList(id);
      return addChallenge;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card pt-2  justify-content-center allChallenges gap-2">
      <div className="d-flex justify-content-between">
        <div className="card-header d-flex w-100 justify-content-between bg-transparent  border-bottom-0">
          <CategoryIcons category={challenge.category} />
          <div className="d-flex flex-column gap-2">
            <DifficultyBadge difficulty={challenge.difficulty} />
            <div className="border p-1">{challenge.duration_days} days</div>
          </div>
        </div>
      </div>
      <div className="card-body">
        <h5 className="card-title">{challenge.title}</h5>
        <div>{challenge.description}</div>
      </div>
      <div className="card-footer ">
        <button
          className="btn btn-primary  "
          onClick={() => handleAddChallenge(challenge._id)}
        >
          Add Challenges<i className="bi bi-plus-lg"></i>
        </button>
      </div>
    </div>
  );
}

export default AllChallengesCards;
