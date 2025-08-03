import { useEffect, useState } from "react";
import challengesService from "../../services/challengesService";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import { useUserChallenges } from "../../hooks/useUserChallenges";

function MyChallenges() {
  const { user } = useAuth();
  const chosenChallenges = useUserChallenges(user._id);
  console.log("chosen", chosenChallenges);

  return (
    <div className="container my-5 w-50 d-flex flex-column gap-3 text-center bg-white p-4 myChallengesCards">
      <h1>The challenges you chose</h1>
      {chosenChallenges.length > 0 &&
        chosenChallenges.map((challenge) => (
          <div
            key={challenge.challengeId._id}
            className="card justify-content-center align-items-center gap-0 border-3"
          >
            <div className="card-header w-100 d-flex justify-content-between">
              <button
                className={
                  challenge.status == "pending"
                    ? "btn btn-warning"
                    : challenge.status == "in-progress"
                    ? "btn btn-info"
                    : "btn btn-success"
                }
              >
                {challenge.status}
              </button>
              <span>icon</span>
            </div>
            <h5 className="my-3 fw-bold fs-4">{challenge.challengeId.title}</h5>
            <h6 className="fs-4">{challenge.challengeId.category}</h6>
            <div className="card-body">
              <p>{challenge.challengeId.description}</p>
            </div>
            <div className="card-footer w-100 d-flex justify-content-center gap-2 p-1">
              <button className="btn btn-info">Update challenge</button>
              <button className="btn btn-danger">Delete Challenge</button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default MyChallenges;
