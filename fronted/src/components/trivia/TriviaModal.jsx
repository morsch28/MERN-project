import { Modal } from "react-bootstrap";
function TriviaModal({ onShow, onClose, question }) {
  return (
    <Modal show={onShow} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Trivia Question</Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
    </Modal>
  );
}

export default TriviaModal;
