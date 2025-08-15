import { useEffect, useState } from "react";
import CommentsModal from "./CommentsModal";

function CompletedChallengesCards({ challenges, onAddComment }) {
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
    if (!activate?._id) {
      return;
    }
    const updated = challenges.find(
      (challenge) => challenge?._id === activate._id
    );
    if (updated) {
      setActivate(updated);
    }
  }, [challenges, activate?._id]);

  const nameToUpperCase = (name) => {
    return name
      .split(" ")
      .filter(Boolean) // מסיר רווחים מיותרים
      .map((word) => word[0]?.toUpperCase() || "")
      .join("")
      .slice(0, 2);
  };

  return (
    <div className="d-flex  w-50 gap-2 mt-4 flex-column mb-4">
      {challenges.map((challenge, index) => {
        const firstName = challenge?.userId?.name?.first || "";
        const lastName = challenge?.userId?.name?.last || "";
        const fullName = `${firstName} ${lastName}`;
        const userName = nameToUpperCase(fullName);
        const date = new Date(challenge?.completedDate);
        const formatDate = date.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });

        const imagePath = challenge?.userId?.image?.url || "";
        const imageUrl = imagePath ? `http://localhost:3000${imagePath}` : null;

        const allComments = challenge?.comments?.length;

        return (
          <div className="card text-center w-100" key={index}>
            <div className="card-header d-flex justify-content-between border border-0 bg-transparent">
              <div className="d-flex gap-2">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      backgroundColor: "blue",
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "1.2rem",
                    }}
                  >
                    {userName}
                  </div>
                )}
                <div className="d-flex flex-column">
                  <div className="fw-bold fs-5">{firstName}</div>
                  <div>Complete Challenge - {formatDate}</div>
                </div>
              </div>
              <div
                className={`p-2 h-75 ${
                  challenge?.challengeId?.category === "nutrition"
                    ? "bg-success-subtle text-success border border-success"
                    : challenge?.challengeId?.category === "mental"
                    ? "bg-info-subtle text-info border border-info"
                    : "bg-warning-subtle text-warning border-border-warning"
                }`}
              >
                {challenge?.challengeId?.category}
              </div>
            </div>
            <div className="card-body d-flex flex-column align-items-center p-3 gap-2">
              <h5 className="card-title fs-4">
                {challenge?.challengeId.title}
              </h5>
              {challenge?.feedback && (
                <p
                  className="card-text bg-body-secondary p-2 rounded-2 w-75"
                  style={{ fontSize: "17px" }}
                >
                  {challenge?.feedback?.text}
                </p>
              )}
            </div>
            <div className="card-footer text-body-secondary border border-0 bg-transparent p-3 d-flex ">
              <button
                onClick={() => openModal(challenge)}
                className="border border-0 bg-transparent fs-5 gap-2 d-flex justify-content-start mx-3"
              >
                Comment {allComments ? `(${allComments})` : ""}
                <i className="bi bi-chat"></i>
              </button>
              <button className="border border-0 bg-transparent fs-5 gap-2 d-flex justify-content-start mx-3">
                I liked it <i className="bi bi-heart"></i>
              </button>
            </div>
          </div>
        );
      })}
      <CommentsModal
        show={show}
        onClose={closeModal}
        challenge={activate}
        onAddComment={onAddComment}
      />
    </div>
  );
}

export default CompletedChallengesCards;
