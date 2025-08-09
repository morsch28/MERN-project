import CategoryIcons from "../common/CategoryIcons";
import ChallengesStatusButtons from "./ChallengesStatusButtons";

function MyChallengesList({ challenges, onUpdate, onShow, reloadChallenges }) {
  return (
    <div className="d-flex flex-wrap gap-3 justify-content-center gap-2 w-100">
      {challenges.length > 0 &&
        challenges.map((challenge) => (
          <div
            className="card justify-content-center align-items-center border-3  userChallenges"
            key={challenge._id}
          >
            <div
              className=" card-header bg-white border border-bottom-0  d-flex justify-content-between align-items-center"
              style={{ width: "100%", maxHeight: "40%" }}
            >
              <CategoryIcons category={challenge.challengeId.category} />
              <h5 className="my-3 fw-bold fs-5">
                {challenge.challengeId.title}
              </h5>
              <button className="border border-1 p-2">
                {challenge.challengeId.category}
              </button>
            </div>
            <div className="card-body w-100 d-flex flex-column">
              {challenge.feedback && (
                <div>
                  <div>
                    {challenge.feedback.image?.url && (
                      <img
                        src={`http://localhost:3000${challenge.feedback.image.url}`}
                        alt={challenge.feedback.image.alt}
                        className="img-fluid rounded border"
                        style={{
                          maxHeight: "180px",
                          objectFit: "cover",
                          width: "100%",
                        }}
                      />
                    )}
                  </div>
                  <div className="mt-3 bg-body-secondary p-1">
                    {challenge.feedback.text && (
                      <p className="d-flex justify-content-center gap-2">
                        <strong>Feedback: </strong>
                        {challenge.feedback.text}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="card-footer w-100 d-flex justify-content-center gap-3">
              <ChallengesStatusButtons
                challenge={challenge}
                onShow={() => onShow(challenge)}
                onUpdate={onUpdate}
                reloadChallenges={reloadChallenges}
              />
            </div>
          </div>
        ))}
    </div>
  );
}

export default MyChallengesList;
