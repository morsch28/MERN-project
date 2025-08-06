import CardsStatus from "../../components/challenges/CardsStatus";
import { useUserChallenges } from "../../hooks/useUserChallenges";
import { useAuth } from "../../context/auth.context";
import WelcomePage from "../../pages/WelcomePage";
import { useNavigate } from "react-router";

function Home() {
  const { isLoading, user } = useAuth();
  const navigate = useNavigate();
  const { chosenChallenges } = useUserChallenges(user?._id);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    console.log("user", user);
    return <WelcomePage />;
  }

  const list = chosenChallenges?.data || [];
  const selectedChallenges = list.slice(0, 3);

  return (
    <div className="d-flex flex-column gap-3 w-100 p-3 mt-1">
      <CardsStatus />
      <div className="d-flex gap-5 justify-content-center mt-2 mb-3 align-items-center home-Challenges">
        <div className="d-flex flex flex-column gap-2 selectedChallenges ">
          <button
            onClick={() => navigate("/all-challenges")}
            className="btn btn-primary px-3 fs-5 btn-allChallenges"
          >
            All challenges
          </button>
          <h1 style={{ fontSize: "30px" }}>Selected Challenges</h1>
          <div className="d-flex gap-3 selectedCardsContainer">
            {selectedChallenges.map((challenge, index) => (
              <div className="card selectedCards" key={index}>
                <div className="d-flex justify-content-between ">
                  {challenge.challengeId?.category == "nutrition" ? (
                    <span className="fs-1">🥗</span>
                  ) : challenge.challengeId?.category == "mental" ? (
                    <span className="fs-1">🧘‍♀️</span>
                  ) : (
                    <span className="fs-1">🚴</span>
                  )}
                  <div className="d-flex flex-column">
                    <h5 className="fw-bold">{challenge.challengeId?.title}</h5>
                    <p className="fs-5">{challenge.challengeId?.category}</p>
                  </div>
                  <div
                    className={`rounded-3 border fw-bold rounded-3 p-1 ${
                      challenge.status == "pending"
                        ? `"bg-warning-subtle text-warning"`
                        : challenge.status == "in-progress"
                        ? `bg-info-subtle text-info text-nowrap`
                        : `bg-success-subtle text-success p-3`
                    }`}
                    style={{
                      maxHeight: "40%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {challenge.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
