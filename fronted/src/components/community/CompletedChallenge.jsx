function CompletedChallenge({ challenge, onOpenModal }) {
  return (
    <div className="card text-center w-100">
      <div className="card-header d-flex justify-content-between border border-0 bg-transparent">
        <div className="d-flex gap-2">
          {challenge?.imageUrl ? (
            <img className="img-CommunityCards01" src={challenge?.imageUrl} />
          ) : (
            <div className="userName-upperCaseImg d-flex justify-content-center align-items-center">
              {challenge?.userName}
            </div>
          )}
          <div className="d-flex flex-column">
            <div className="fw-bold fs-5">{challenge?.firstName}</div>
            <div>Complete Challenge - {challenge?.formatDate}</div>
          </div>
        </div>
        <div className={`p-2 h-75 ${challenge?.classes}`}>
          {challenge?.category}
        </div>
      </div>
      <div className="card-body d-flex flex-column align-items-center p-3 gap-2">
        <h5 className="card-title fs-4">{challenge?.title}</h5>
        {challenge?.feedback && (
          <p
            className="card-text bg-body-secondary p-2 rounded-2 w-75"
            style={{ fontSize: "17px" }}
          >
            {challenge?.feedback}
          </p>
        )}
      </div>
      <div className="card-footer text-body-secondary border border-0 bg-transparent p-3 d-flex ">
        <button
          onClick={() => onOpenModal(challenge)}
          className="border border-0 bg-transparent fs-5 gap-2 d-flex justify-content-start mx-3"
        >
          Comment {challenge?.allComments ? `(${challenge?.allComments})` : ""}
          <i className="bi bi-chat"></i>
        </button>
        <button className="border border-0 bg-transparent fs-5 gap-2 d-flex justify-content-start mx-3">
          I liked it <i className="bi bi-heart"></i>
        </button>
      </div>
    </div>
  );
}

export default CompletedChallenge;
