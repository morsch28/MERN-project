import { Modal, Button } from "react-bootstrap";
import FeedbackForm from "./FeedbackForm";
import feedbackService from "../../services/feedbackService";

function FeedbackModal({ onShow, onClose, challengeId, challengeTitle }) {
  let submitForm = null;

  const handleSave = async () => {
    const result = await feedbackService.showConfirm({
      text: "Are you sure you want to save feedback for this challenge?",
    });
    if (result.isConfirmed) {
      submitForm && submitForm();
    } else {
      return;
    }
  };

  return (
    <Modal show={onShow} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Document your progress</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-3 fs-5">
          How is it going with the challenge: <strong>{challengeTitle}</strong>?
        </p>
        <FeedbackForm
          challengeId={challengeId}
          setSubmit={(handleSubmit) => (submitForm = handleSubmit)}
          onSuccess={onClose}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save progress
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FeedbackModal;
