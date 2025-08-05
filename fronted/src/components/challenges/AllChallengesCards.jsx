import challengesService from "../../services/challengesService";

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
    <div className="card p-2 justify-content-center allChallenges gap-0">
      <div className="d-flex justify-content-between">
        {challenge.category == "nutrition" ? (
          <i className="fs-1">🥗</i>
        ) : challenge.category == "fitness" ? (
          <i className="fs-1">🏃‍♂️</i>
        ) : (
          <i className="fs-1">🧘‍♀️</i>
        )}

        <div className="d-flex flex-column gap-2">
          <div
            className={`p-1 fw-bold rounded-2 ${
              challenge.difficulty === "easy"
                ? "bg-success-subtle text-success"
                : challenge.difficulty === "medium"
                ? "bg-warning-subtle text-warning"
                : "text-danger bg-danger-subtle"
            }`}
          >
            {challenge.difficulty}
          </div>
          <div className="border p-1">{challenge.duration_days} days</div>
        </div>
      </div>
      <div className="card-body">
        <h5 className="card-title">{challenge.title}</h5>
        <div>{challenge.description}</div>
      </div>
      <div className="card-footer ">
        <button
          className="btn btn-primary p-1 "
          onClick={() => handleAddChallenge(challenge._id)}
        >
          Add Challenges<i className="bi bi-plus-lg"></i>
        </button>
      </div>
    </div>
  );
}

export default AllChallengesCards;
