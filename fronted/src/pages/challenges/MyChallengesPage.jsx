import { useState } from "react";
import challengesService from "../../services/challengesService";
import MyChallengesManager from "../../components/challenges/MyChallengesManager";
import OptionSelector from "../../components/OptionSelector";
import feedbackService from "../../services/feedbackService";
import { useMyChallenges } from "../../context/challenges.context";
import "./challenges.css";

function MyChallengesPage() {
  const [challengesStatus, setChallengesStatus] = useState("pending");

  const { myChallenges, loadUserChallenges } = useMyChallenges();

  const list = myChallenges?.data || [];
  const filterChallenges = list.filter((c) => c.status == challengesStatus);

  const handleUpdate = async (id, currentStatus) => {
    try {
      let nextStatus = "";
      if (currentStatus == "pending") nextStatus = "in-progress";
      else if (currentStatus == "in-progress") nextStatus = "done";
      else return;
      const response = await challengesService.updateUserChallenge(id, {
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
        text: `Server error: ${error.message}`,
        icon: "error",
        timer: 2000,
      });
    }
  };

  return (
    <div className="container my-5  d-flex flex-column gap-3 text-center align-items-center bg-white p-4 MyChallengesManager">
      <h1>The challenges you chose</h1>
      <OptionSelector
        options={["pending", "in-progress", "done"]}
        onSelected={setChallengesStatus}
        selected={challengesStatus}
      />
      <MyChallengesManager
        challenges={filterChallenges}
        onUpdate={handleUpdate}
        reloadChallenges={loadUserChallenges}
      />
    </div>
  );
}

export default MyChallengesPage;
