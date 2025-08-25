import { useEffect, useState } from "react";
import CommentsModal from "./CommentsModal";
import CompletedChallenge from "./CompletedChallenge";

function CompletedChallenges({ challenges, onAddComment, onDeleteComment }) {
  const [show, setShow] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const openModal = (challenge) => {
    setActiveId(challenge.id);
    setShow(true);
  };
  const closeModal = () => {
    setShow(false);
    setActiveId(null);
  };

  const activeChallenge = challenges.find(
    (challenge) => challenge.id == activeId
  );

  return (
    <div className="d-flex  gap-2 mt-4 flex-column mb-4 community-cards">
      {challenges.map((challenge) => (
        <CompletedChallenge
          challenge={challenge}
          onOpenModal={openModal}
          key={challenge.id}
        />
      ))}
      <CommentsModal
        show={show}
        onClose={closeModal}
        challenge={activeChallenge}
        onAddComment={onAddComment}
        onDeleteComment={onDeleteComment}
      />
    </div>
  );
}

export default CompletedChallenges;
