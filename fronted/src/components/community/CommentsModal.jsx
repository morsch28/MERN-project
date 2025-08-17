import { Modal, Button, Form } from "react-bootstrap";
import communityService from "../../services/communityService";
import { useEffect, useState } from "react";
import CommentsList from "./CommentsList";

function CommentsModal({
  show,
  onClose,
  challenge,
  onAddComment,
  onDeleteComment,
}) {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [challengeComments, setChallengeComments] = useState([]);
  const [commentToEdit, setCommentToEdit] = useState(null);

  useEffect(() => {
    setChallengeComments(challenge?.comments || []);
  }, [challenge]);

  if (!challenge) {
    return null;
  }

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

  const startEdit = (commentId) => {
    const element = document.getElementById(`update-${commentId}`);
    if (!element) {
      return;
    }
    setCommentToEdit(commentId);
    element.contentEditable = true;
    element.focus();
    element.style.outline = "1px solid black";
  };

  const saveEdit = async (commentId) => {
    const element = document.getElementById(`update-${commentId}`);
    if (!element) {
      return;
    }
    const newText = element.innerText.trim();
    try {
      const response = await communityService.updateComment(commentId, newText);
      if (response.status == 200) {
        if (challenge?.comments) {
          const index = challenge.comments.findIndex(
            (c) => c?._id === commentId
          );
          if (index > -1) {
            challenge.comments[index].text = newText;
          }
        }
        element.contentEditable = false;
        element.style.outline = "none";
        setCommentToEdit(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Comments</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CommentsList
          comments={challengeComments}
          onSave={saveEdit}
          onStart={startEdit}
          onDelete={onDeleteComment}
          commentToEdit={commentToEdit}
          challenge={challenge}
        />

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
