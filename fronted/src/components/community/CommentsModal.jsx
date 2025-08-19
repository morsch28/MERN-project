import { Modal, Button, Form } from "react-bootstrap";
import communityService from "../../services/communityService";
import { useState } from "react";
import CommentsList from "./CommentsList";
import feedbackService from "../../services/feedbackService";

function CommentsModal({
  show,
  onClose,
  challenge,
  onAddComment,
  onDeleteComment,
}) {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState(null);

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
      const response = await onAddComment?.(challenge.id, commentData);
      if (response) {
        console.log("response text", response);
        setText("");
      }
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
        const result = await feedbackService.showConfirm({
          text: "Are you sure you want to edit the comment?",
        });
        if (result.isConfirmed) {
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
      } else {
        await feedbackService.showAlert({
          title: "Ops..!",
          text: response.message,
          icon: "error",
          timer: 2000,
        });
      }
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
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Comments</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CommentsList
          comments={challenge?.comments || []}
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
