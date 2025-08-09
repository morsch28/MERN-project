import { useState } from "react";
import ChallengeFeedbackModal from "./ChallengeFeedbackModal";
import MyChallengesList from "./MyChallengesList";

function MyChallengesManager({ challenges, onUpdate, reloadChallenges }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const handleShow = (challenge) => {
    setSelectedChallenge(challenge);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedChallenge(null);
  };

  return (
    <div>
      <MyChallengesList
        onShow={handleShow}
        onUpdate={onUpdate}
        challenges={challenges}
        reloadChallenges={reloadChallenges}
      />
      <ChallengeFeedbackModal
        onShow={showModal}
        onClose={handleClose}
        reloadChallenges={reloadChallenges}
        challenge={selectedChallenge}
      />
    </div>
  );
}

export default MyChallengesManager;
