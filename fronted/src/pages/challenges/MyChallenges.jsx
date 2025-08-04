import { useState } from "react";
import { useAuth } from "../../context/auth.context";
import { useUserChallenges } from "../../hooks/useUserChallenges";
import challengesService from "../../services/challengesService";

function MyChallenges() {
  const [challengesStatus, setChallengesStatus] = useState("pending");
  const { user } = useAuth();
  const { chosenChallenges, loadUserChallenges } = useUserChallenges(user._id);

  const filterChallenges = chosenChallenges.filter(
    (c) => c.status == challengesStatus
  );

  const handleUpdate = async (id, currentStatus) => {
    try {
      let nextStatus = "";
      if (currentStatus == "pending") nextStatus = "in-progress";
      else if (currentStatus == "in-progress") nextStatus = "done";
      else return;
      const response = await challengesService.updateChallenge(id, {
        status: nextStatus,
      });
      await loadUserChallenges();
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container my-5  d-flex flex-column gap-3 text-center align-items-center bg-white p-4 myChallengesCards">
      <h1>The challenges you chose</h1>
      <div className="d-flex gap-2 justify-content-center rounded-3 border border-1 p-2 border-dark">
        {["pending", "in-progress", "done"].map((status) => (
          <button
            key={status}
            className={`${
              challengesStatus == status
                ? "btn btn-info"
                : "btn btn-outline-dark"
            }`}
            onClick={() => setChallengesStatus(status)}
          >
            {status}
          </button>
        ))}
      </div>
      <div className="d-flex flex-wrap gap-2 justify-content-center gap-2 w-100">
        {filterChallenges.length > 0 &&
          filterChallenges.map((challenge) => (
            <div
              key={challenge.challengeId._id}
              className="card justify-content-center align-items-center border-3 p-3 userChallenges"
            >
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
              <h5 className="my-3 fw-bold fs-5">
                {challenge.challengeId.title}
              </h5>
              <div className="card-footer w-100 d-flex justify-content-center gap-3">
                {challenge.status == "pending" && (
                  <button
                    onClick={() =>
                      handleUpdate(challenge._id, challenge.status)
                    }
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
                      onClick={() =>
                        handleUpdate(challenge._id, challenge.status)
                      }
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
    </div>
  );
}

export default MyChallenges;
