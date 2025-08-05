import { useState } from "react";
import { useAuth } from "../../context/auth.context";
import { useUserChallenges } from "../../hooks/useUserChallenges";
import challengesService from "../../services/challengesService";
import MyChallengesCards from "./MyChallengesCards";

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
            <MyChallengesCards
              key={challenge.challengeId._id}
              onUpdate={handleUpdate}
              challenge={challenge}
            />
          ))}
      </div>
    </div>
  );
}

export default MyChallenges;
