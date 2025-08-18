import { useEffect, useState } from "react";
import CommentsModal from "./CommentsModal";
import CompletedChallenge from "./CompletedChallenge";

function CompletedChallenges({ challenges, onAddComment, onDeleteComment }) {
  const [show, setShow] = useState(false);
  const [activate, setActivate] = useState(null);

  const openModal = (challenge) => {
    setActivate(challenge);
    setShow(true);
  };
  const closeModal = () => {
    setShow(false);
    setActivate(null);
  };

  useEffect(() => {
    if (!activate?.id) {
      return;
    }
    const updated = challenges.find(
      (challenge) => challenge?.id === activate.id
    );
    if (updated) {
      setActivate(updated);
    }
  }, [challenges, activate?.id]);

  return (
    <div className="d-flex  w-50 gap-2 mt-4 flex-column mb-4">
      {challenges.map((challenge, index) => (
        <CompletedChallenge
          challenge={challenge}
          onOpenModal={openModal}
          key={index}
        />
      ))}
      <CommentsModal
        show={show}
        onClose={closeModal}
        challenge={activate}
        onAddComment={onAddComment}
        onDeleteComment={onDeleteComment}
      />
    </div>
  );
}

export default CompletedChallenges;
