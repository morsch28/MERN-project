import CategoryIcons from "./CategoryIcons";

function MyChallengesCards({ challenges, onUpdate }) {
  return (
    <div className="d-flex flex-wrap gap-3 justify-content-center gap-2 w-100">
      {challenges.length > 0 &&
        challenges.map((challenge) => (
          <div
            className="card justify-content-center align-items-center border-3  userChallenges"
            key={challenge._id}
          >
            <div className=" card-header bg-white border border-bottom-0 w-100 d-flex justify-content-between">
              <CategoryIcons category={challenge.challengeId.category} />
              <button className="border border-1 p-2">
                {challenge.challengeId.category}
              </button>
            </div>
            <h5 className="my-3 fw-bold fs-5">{challenge.challengeId.title}</h5>
            <div className="card-footer w-100 d-flex justify-content-center gap-3">
              {challenge.status == "pending" && (
                <button
                  onClick={() => onUpdate(challenge._id, challenge.status)}
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
                    onClick={() => onUpdate(challenge._id, challenge.status)}
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
        ))}
    </div>
  );
}

export default MyChallengesCards;
