function CompletedChallenge({ challenge, onOpenModal }) {
  return (
    <div className="card text-center p-2 ">
      <div className="card-header d-flex justify-content-between border border-0 bg-transparent align-items-center">
        <div className="d-flex gap-3 align-items-center">
          {challenge?.imageUrl ? (
            <img className="img-CommunityCards01" src={challenge?.imageUrl} />
          ) : (
            <div className="userName-upperCaseImg d-flex justify-content-center align-items-center p-1">
              {challenge?.userName}
            </div>
          )}
          <div className="d-flex flex-column">
            <div className="fw-bold fs-5">{challenge?.firstName}</div>
            <div>Complete Challenge - {challenge?.formatDate}</div>
          </div>
        </div>
        <div
          className={`p-1 h-75 d-flex align-items-center fw-bold ${challenge?.classes}`}
        >
          {challenge?.category}
        </div>
      </div>
      <div className="card-body d-flex flex-column align-items-center p-3 gap-2">
        <h5 className="card-title fs-5">{challenge?.title}</h5>
        {challenge?.feedback && (
          <p
            className="card-text bg-body-secondary p-2 rounded-2 w-75"
            style={{ fontSize: "16px" }}
          >
            {challenge?.feedback}
          </p>
        )}
      </div>
      <div className="card-footer text-body-secondary border border-0 bg-transparent p-3 d-flex ">
        <button
          onClick={() => onOpenModal(challenge)}
          className="border border-0 bg-transparent gap-2 d-flex justify-content-start mx-3"
          style={{ fontSize: "1.2rem" }}
        >
          Comment {challenge?.comments ? `(${challenge?.comments.length})` : ""}
          <i className="bi bi-chat" style={{ fontSize: "1.2rem" }}></i>
        </button>
        {/* <button className="border border-0 bg-transparent fs-5 gap-2 d-flex justify-content-start mx-3">
          I liked it <i className="bi bi-heart"></i>
        </button> */}
      </div>
    </div>
  );
}

export default CompletedChallenge;
