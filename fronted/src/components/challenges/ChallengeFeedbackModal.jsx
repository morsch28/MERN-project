import { Modal } from "react-bootstrap";
import FeedbackForm from "./FeedbackForm";

function ChallengeFeedbackModal({
  onShow,
  onClose,
  challenge,
  reloadChallenges,
}) {
  if (!challenge) {
    return;
  }

  const { _id, challengeId, feedback } = challenge;
  const title = challengeId?.title;

  return (
    <Modal show={onShow} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Document your progress</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-3 fs-5">
          How is it going with the challenge: <strong>{title}</strong>?
        </p>
        <FeedbackForm
          initialFeedback={feedback}
          challengeId={_id}
          onSuccess={() => {
            onClose();
            reloadChallenges?.();
          }}
        />
      </Modal.Body>
    </Modal>
  );
}

export default ChallengeFeedbackModal;
