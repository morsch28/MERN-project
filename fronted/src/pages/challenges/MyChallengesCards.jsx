function MyChallengesCards({ challenge, onUpdate }) {
  return (
    <div className="card justify-content-center align-items-center border-3 p-3 userChallenges">
      <div className="w-100 d-flex justify-content-between">
        <button className="border-0 rounded-2 bg-dark-subtle">
          {challenge.challengeId.category}
        </button>
        {challenge.challengeId.category == "nutrition" && (
          <span className="fs-2">🥗</span>
        )}
        {challenge.challengeId.category == "mental" && (
          <span className="fs-2">🧘‍♀️</span>
        )}
        {challenge.challengeId.category == "fitness" && (
          <span className="fs-2">🚴</span>
        )}
      </div>
      <h5 className="my-3 fw-bold fs-5">{challenge.challengeId.title}</h5>
      <div className="card-footer w-100 d-flex justify-content-center gap-3">
        {challenge.status == "pending" && (
          <button
            onClick={() => handleUpdate(challenge._id, challenge.status)}
            className="btn btn-dark p-2  d-flex align-items-center"
          >
            Start challenge
            <i className="bi bi-play fs-5"></i>
          </button>
        )}
        {challenge.status == "in-progress" && (
          <>
            <button className="btn btn-outline-dark">
              Log <i className="bi bi-pencil-square"></i>
            </button>
            <button
              className="btn btn-success  fs-5 text-nowrap"
              onClick={() => handleUpdate(challenge._id, challenge.status)}
            >
              end
              <i className="bi bi-check2-circle  fs-5 text-nowrap"></i>
            </button>
          </>
        )}
        {challenge.status == "done" && (
          <button>
            Completed On {""}
            {new Date(challenge.completedDate).toDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </button>
        )}
      </div>
    </div>
  );
}

export default MyChallengesCards;
