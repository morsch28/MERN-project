import CardsStatus from "./CardsStatus";
import { useUserChallenges } from "../../hooks/useUserChallenges";
import { useAuth } from "../../context/auth.context";
import PageHeader from "../../components/common/PageHeader";

function Home() {
  const { user } = useAuth();
  const chosenChallenges = useUserChallenges(user._id);
  const someOfChallenges = chosenChallenges.slice(0, 3);

  return (
    <div className="d-flex flex-column gap-3 w-100 p-3 mt-1">
      <CardsStatus />
      <div className="d-flex gap-5 justify-content-center mt-2 mb-3 align-items-center home-Challenges">
        <div
          className="d-flex flex-column gap-3 selectedChallenges "
          style={{ flex: 0.7 }}
        >
          <h1 style={{ fontSize: "30px" }}>Selected Challenges</h1>
          {someOfChallenges.map((challenge, index) => (
            <div className="card p-3 d-flex  selectedCards" key={index}>
              <div className="d-flex justify-content-between">
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
                  className={
                    challenge.status == "pending"
                      ? "bg-warning-subtle text-warning  w-15 h-50 p-1  fs-5 fw-bold border rounded-3"
                      : challenge.status == "in-progress"
                      ? "bg-info-subtle text-info  px-3 fs-5 fw-bold border rounded-3"
                      : "bg-success-subtle text-success px-3 fs-5 fw-bold border rounded-3"
                  }
                >
                  {challenge.status}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex flex-column align-items-center p-3 gap-4 addChallenges">
          <h5 className="fs-4">Ready for more?</h5>
          <p className="fs-5">
            Discover new challenges to push your wellness journey forward.
          </p>
          <button className="btn btn-primary px-3 fs-5">
            Add challenges to list
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
