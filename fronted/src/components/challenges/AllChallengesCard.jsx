import challengesService from "../../services/challengesService";
import CategoryIcons from "../common/CategoryIcons";
import DifficultyBadge from "./DifficultyBadge";
import feedbackService from "../../services/feedbackService";
import { ROUTES } from "../../routes/routes";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/auth.context";

function AllChallengesCard({ challenge, onAdd, status, onDelete }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAddChallenge = async (id) => {
    try {
      const addChallenge = await challengesService.addChallengeToList(id);
      if (addChallenge.status) {
        await feedbackService.showAlert({
          title: "Done!",
          text: "Successfully added to the challenge database",
          icon: "success",
          timer: 2000,
        });
        await onAdd();
      } else {
        await feedbackService.showAlert({
          title: "Ops...!",
          text: "can't add challenge to database",
          icon: "error",
          timer: 2000,
        });
      }
      return addChallenge;
    } catch (error) {
      await feedbackService.showAlert({
        title: "Ops...!",
        text: "server error",
        icon: "error",
        timer: 2000,
      });
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`${ROUTES.UPDATE_CHALLENGE}/${challenge._id}`, {
      state: { challenge },
    });
  };

  return (
    <div
      className={`card pt-2  justify-content-center allChallenges gap-2 d-flex flex-column h-100`}
    >
      <Link
        to={`${ROUTES.CHALLENGE_DETAILS}/${challenge._id}`}
        className="text-decoration-none text-dark flex-grow-1 "
      >
        <div className="d-flex justify-content-between">
          <div className="card-header d-flex w-100 justify-content-between bg-transparent  border-bottom-0">
            <CategoryIcons category={challenge.category} />
            <div className="d-flex flex-column gap-2">
              <DifficultyBadge difficulty={challenge.difficulty} />
              <div className="border p-1">{challenge.duration_days} days</div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title">{challenge.title}</h5>
          <div>{challenge.description}</div>
        </div>
      </Link>
      <div
        className={`card-footer d-flex gap-2 justify-content-center   ${
          status && `is-chosen-${status}`
        }`}
        style={{ height: "74px" }}
      >
        {status ? (
          <button className="btn btn-secondary" disabled>
            {status}
          </button>
        ) : (
          <button
            className="btn btn-primary  "
            onClick={() => handleAddChallenge(challenge._id)}
          >
            Add Challenge
          </button>
        )}
        {user?.isAdmin && (
          <>
            <button onClick={handleEdit} className="btn btn-outline-secondary">
              <i className="bi bi-pencil" />
            </button>
            <button
              onClick={() => onDelete(challenge._id)}
              className="btn btn-outline-danger"
            >
              <i className="bi bi-trash " />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default AllChallengesCard;
