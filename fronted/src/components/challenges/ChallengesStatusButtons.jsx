function ChallengesStatusButtons({ challenge, onUpdate, onShow }) {
  const { _id, status, feedback, completedDate } = challenge;
  return (
    <>
      {status == "pending" && (
        <button
          onClick={() => onUpdate(_id, status)}
          className="btn btn-dark p-2  d-flex align-items-center"
        >
          Start challenge
          <i className="bi bi-play fs-5"></i>
        </button>
      )}
      {status == "in-progress" && (
        <>
          <button
            className="btn btn-outline-dark"
            onClick={() => onShow(challenge)}
          >
            {feedback ? "Update Log" : "Log"}{" "}
            <i className="bi bi-pencil-square"></i>
          </button>
          <button
            className="btn btn-success  fs-5 text-nowrap"
            onClick={() => onUpdate(_id, status)}
          >
            end
            <i className="bi bi-check2-circle  fs-5 text-nowrap"></i>
          </button>
        </>
      )}
      {status == "done" && (
        <button className="btn bg-success-subtle text-success d-flex gap-2 fw-bold">
          Completed On {""}
          {new Date(completedDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
          <i className="bi bi-trophy"></i>
        </button>
      )}
    </>
  );
}

export default ChallengesStatusButtons;
