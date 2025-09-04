import challengeService from "../../services/challengesService";
import feedbackService from "../../services/feedbackService";

function ChallengesStatusButtons({
  challenge,
  onUpdate,
  onShow,
  reloadChallenges,
}) {
  const handleDelete = async (id) => {
    const result = await feedbackService.showConfirm({
      text: "Are you sure you want to delete?",
    });
    if (!result.isConfirmed) {
      return;
    }

    try {
      const response = await challengeService.deleteUserChallenge(id);
      if (response.data.status) {
        await feedbackService.showAlert({
          title: "Ok!",
          text: "Challenge deleted successfully",
          icon: "success",
          timer: 2000,
        });
        if (typeof reloadChallenges == "function") {
          await reloadChallenges();
        }
      } else {
        await feedbackService.showAlert({
          title: "Ops..!",
          text: `Something is wrong can't delete challenge: ${response.data}`,
          icon: "error",
          timer: 2000,
        });
      }
    } catch (error) {
      await feedbackService.showAlert({
        title: "Ops..!",
        text: `Server error`,
        icon: "error",
        timer: 2000,
      });
    }
  };

  const { _id, status, feedback, completedDate } = challenge;
  return (
    <>
      {status == "pending" && (
        <div className="d-flex gap-2">
          <button
            onClick={() => onUpdate(_id, status)}
            className="btn btn-dark p-2  d-flex align-items-center"
          >
            Start challenge
            <i className="bi bi-play fs-5"></i>
          </button>
          <button
            onClick={() => handleDelete(_id)}
            className="btn text-danger border border-danger fs-5"
          >
            <i className="bi bi-trash3"></i>
          </button>
        </div>
      )}
      {status == "in-progress" && (
        <div className="d-flex gap-3">
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
          <button
            onClick={() => handleDelete(_id)}
            className="btn text-danger border border-danger fs-5"
          >
            <i className="bi bi-trash3"></i>
          </button>
        </div>
      )}
      {status == "done" && (
        <div className="d-flex flex-column gap-2">
          <button className="btn bg-success-subtle text-success d-flex  fw-bold border border-success gap-2">
            Completed On {""}
            {new Date(completedDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            <i className="bi bi-trophy"></i>
          </button>
          <button
            onClick={() => handleDelete(_id)}
            className="btn text-danger border border-danger fs-5 d-flex gap-2 justify-content-center"
          >
            <i className="bi bi-trash3"></i>
            Delete Challenge
          </button>
        </div>
      )}
    </>
  );
}

export default ChallengesStatusButtons;
