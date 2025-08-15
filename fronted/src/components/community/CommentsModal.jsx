import { Modal, Button, Form } from "react-bootstrap";
import communityService from "../../services/communityService";
import { useState } from "react";

function CommentsModal({ show, onClose, challenge, onAddComment }) {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [challengeComments, setChallengeComments] = useState([]);

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
      if (response) {
        console.log("its good", response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const buildImageUrl = (path) => {
    if (!path) {
      return null;
    }
    return `http://localhost:3000${path}`;
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
          {console.log("challenge comments ", challenge)}
          {comments.length == 0 && <div>No Comment Yet</div>}
          {comments.map((comment) => {
            const user = comment?.userId;
            const userImg = buildImageUrl(user?.image?.url);
            const fullName = `${user?.name?.first} ${user?.name?.last}`;

            return (
              <div className="d-flex gap-2 border border-bottom p-2 align-items-center">
                {userImg ? (
                  <img
                    src={userImg}
                    alt={fullName}
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                )}
                <div className="d-flex flex-column">
                  <div>{fullName}</div>
                  <div key={comment._id}>{comment.text}</div>
                </div>
                <div className="d-flex gap-2 mx-5">
                  <button>
                    <i className="bi bi-trash3"></i>
                  </button>
                  <button>
                    <i className="bi bi-pencil"></i>
                  </button>
                </div>
              </div>
            );
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
