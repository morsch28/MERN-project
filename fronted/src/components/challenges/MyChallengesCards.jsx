import CategoryIcons from "./CategoryIcons";
import { useState } from "react";
import FeedbackModal from "./FeedbackModal";

function MyChallengesCards({ challenges, onUpdate, reloadChallenges }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedChallengeId, setSelectedChallengeId] = useState(null);
  const [selectedChallengeTitle, setSelectedChallengeTitle] = useState("");

  const handleShow = (challengeId, title) => {
    setSelectedChallengeId(challengeId);
    setSelectedChallengeTitle(title);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedChallengeId(null);
    setSelectedChallengeTitle("");
  };

  return (
    <div className="d-flex flex-wrap gap-3 justify-content-center gap-2 w-100">
      {challenges.length > 0 &&
        challenges.map((challenge) => (
          <div
            className="card justify-content-center align-items-center border-3  userChallenges"
            key={challenge._id}
          >
            <div className=" card-header bg-white border border-bottom-0 w-100 d-flex justify-content-between">
              <CategoryIcons category={challenge.challengeId.category} />
              <button className="border border-1 p-2">
                {challenge.challengeId.category}
              </button>
            </div>
            <div className="card-body">
              <h5 className="my-3 fw-bold fs-5">
                {challenge.challengeId.title}
              </h5>
              {challenge.feedback && (
                <div>
                  {challenge.feedback.text && (
                    <p>
                      <strong>Feedback: </strong>
                      {challenge.feedback.text}
                    </p>
                  )}
                  {challenge.feedback.image?.url && (
                    <img
                      src={`http://localhost:3000${challenge.feedback.image.url}`}
                      alt={challenge.feedback.image.alt}
                      className="img-fluid rounded border"
                      style={{ maxHeight: "200px", objectFit: "cover" }}
                    />
                  )}
                </div>
              )}
            </div>
            <div className="card-footer w-100 d-flex justify-content-center gap-3">
              {challenge.status == "pending" && (
                <button
                  onClick={() => onUpdate(challenge._id, challenge.status)}
                  className="btn btn-dark p-2  d-flex align-items-center"
                >
                  Start challenge
                  <i className="bi bi-play fs-5"></i>
                </button>
              )}
              {challenge.status == "in-progress" && (
                <>
                  <button
                    className="btn btn-outline-dark"
                    onClick={() =>
                      handleShow(challenge._id, challenge.challengeId.title)
                    }
                  >
                    Log <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    className="btn btn-success  fs-5 text-nowrap"
                    onClick={() => onUpdate(challenge._id, challenge.status)}
                  >
                    end
                    <i className="bi bi-check2-circle  fs-5 text-nowrap"></i>
                  </button>
                </>
              )}
              {challenge.status == "done" && (
                <button>
                  Completed On {""}
                  {new Date(challenge.completedDate).toDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </button>
              )}
            </div>
          </div>
        ))}

      <FeedbackModal
        onShow={showModal}
        onClose={handleClose}
        challengeId={selectedChallengeId}
        challengeTitle={selectedChallengeTitle}
      />
    </div>
  );
}

export default MyChallengesCards;
