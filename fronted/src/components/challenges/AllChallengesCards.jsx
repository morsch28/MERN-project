function AllChallengesCards({ challenge }) {
  return (
    <div className="card p-2 justify-content-center allChallenges gap-0">
      <div className="d-flex justify-content-between">
        {challenge.category == "nutrition" && <i className="fs-1">🥗</i>}
        {challenge.category == "fitness" && <i className="fs-1">🏃‍♂️</i>}
        {challenge.category == "mental" && <i className="fs-1">🧘‍♀️</i>}
        <div className="d-flex flex-column gap-2">
          <div
            className={
              challenge.difficulty == "easy"
                ? "bg-success-subtle text-success rounded-2 fw-bold p-1"
                : challenge.difficulty == "medium"
                ? "bg-warning-subtle text-warning rounded-2 fw-bold p-1"
                : "text-danger bg-danger-subtle rounded-2 fw-bold p-1"
            }
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
