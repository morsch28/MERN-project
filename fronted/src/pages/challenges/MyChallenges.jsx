import { useState } from "react";
import { useAuth } from "../../context/auth.context";
import { useUserChallenges } from "../../hooks/useUserChallenges";
import challengesService from "../../services/challengesService";
import MyChallengesCards from "../../components/challenges/MyChallengesCards";
import OptionSelector from "../../components/OptionSelector";
import feedbackService from "../../services/feedbackService";

function MyChallenges() {
  const [challengesStatus, setChallengesStatus] = useState("pending");
  const { user } = useAuth();

  const { chosenChallenges, loadUserChallenges } = useUserChallenges(user?._id);
  const list = chosenChallenges?.data || [];
  const filterChallenges = list.filter((c) => c.status == challengesStatus);

  const handleUpdate = async (id, currentStatus) => {
    try {
      let nextStatus = "";
      if (currentStatus == "pending") nextStatus = "in-progress";
      else if (currentStatus == "in-progress") nextStatus = "done";
      else return;
      const response = await challengesService.updateChallenge(id, {
        status: nextStatus,
      });
      if (response.status) {
        if (currentStatus == "pending") {
          const result = await feedbackService.showConfirm({
            text: "Are you sure you want to start the challenge?",
          });
          if (!result.isConfirmed) {
            return;
          }
        } else if (currentStatus == "in-progress") {
          const result = await feedbackService.showConfirm({
            text: "Are you sure you want to end the challenge?",
          });
          if (!result.isConfirmed) {
            return;
          }
        }
      }
      await loadUserChallenges();
      return response;
    } catch (error) {
      await feedbackService.showAlert({
        title: "Ops..!",
        text: "Server error",
        icon: "error",
        timer: 2000,
      });
    }
  };

  return (
    <div className="container my-5  d-flex flex-column gap-3 text-center align-items-center bg-white p-4 myChallengesCards">
      <h1>The challenges you chose</h1>
      <OptionSelector
        options={["pending", "in-progress", "done"]}
        onSelected={setChallengesStatus}
        selected={challengesStatus}
      />
      <MyChallengesCards
        challenges={filterChallenges}
        onUpdate={handleUpdate}
        reloadChallenges={loadUserChallenges}
      />
    </div>
  );
}

export default MyChallenges;
