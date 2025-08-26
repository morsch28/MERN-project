import CardsStatus from "../../components/challenges/CardsStatus";
import { useAuth } from "../../context/auth.context";
import WelcomePage from "../welcome/WelcomePage";
import { useNavigate } from "react-router";
import CategoryIcons from "../../components/common/CategoryIcons";
import StatusBadge from "../../components/challenges/StatusBadge";
import { ROUTES } from "../../routes/routes";
import { useMyChallenges } from "../../context/challenges.context";

function HomePage() {
  const { isLoading, user } = useAuth();
  const navigate = useNavigate();
  const { myChallenges } = useMyChallenges();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <WelcomePage />;
  }

  const list = myChallenges?.data || [];
  const selectedChallenges = list.slice(0, 3);

  return (
    <div className="d-flex flex-column gap-3 w-100 p-3 mt-1">
      <CardsStatus />
      <div className="d-flex gap-5 justify-content-center mt-2 mb-3 align-items-center home-Challenges">
        <div className="d-flex flex flex-column gap-2 selectedChallenges ">
          <div className="d-flex justify-content-center">
            <button
              onClick={() => navigate(ROUTES.ALL_CHALLENGES)}
              className="btn btn-primary px-2 fs-5 position-fixed start-0 top-0 mt-2 mx-3"
            >
              All challenges
            </button>
            <h1 style={{ fontSize: "30px" }}>Selected Challenges</h1>
          </div>
          <div className="d-flex gap-3 selectedCardsContainer">
            {selectedChallenges.map((challenge, index) => (
              <div className="card selectedCards" key={index}>
                <div className="d-flex justify-content-between ">
                  <CategoryIcons category={challenge.challengeId.category} />
                  <div className="d-flex flex-column">
                    <h5 className="fw-bold">{challenge.challengeId?.title}</h5>
                    <p className="fs-5">{challenge.challengeId?.category}</p>
                  </div>
                  <StatusBadge status={challenge.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
