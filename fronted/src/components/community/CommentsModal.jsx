import { Modal, Button, Form } from "react-bootstrap";
import communityService from "../../services/communityService";
import { useState } from "react";

function CommentsModal({ show, onClose, challenge, onAddComment }) {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!challenge) {
    return null;
  }
  const comments = challenge.comments || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const commentData = text.trim();
    if (!commentData) {
      return;
    }
    setSubmitting(true);
    try {
      const response = await onAddComment?.(challenge._id, commentData);
      return response;
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Comments</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          className="d-flex flex-column gap-2"
          style={{ maxHeight: 300, overflowY: "auto" }}
        >
          {comments.length == 0 && <div>No Comment Yet</div>}
          {comments.map((comment) => {
            return <div key={comment._id}>{comment.text}</div>;
          })}
        </div>
        <Form onSubmit={handleSubmit}>
          <div className="d-flex gap-2">
            <Form.Control
              placeholder="Add Comment"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button type="submit" disabled={submitting || !text.trim()}>
              Send
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CommentsModal;
