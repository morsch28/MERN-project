import { useParams } from "react-router-dom";
import challengeService from "../../services/challengesService";
import { useEffect, useState } from "react";
import nutritionImg from "../../images/shaksuka.jpg";
import fitness from "../../images/fitness.jpg";
import mentalImg from "../../images/nature2.jpg";

function ChallengeDetails() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    const loadChallengeDetails = async () => {
      try {
        const response = await challengeService.getChallengeById(id);
        setChallenge(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadChallengeDetails();
  }, [id]);

  if (!challenge) {
    return <div>Loading ....</div>;
  }

  return (
    <div className="card my-4 challenge-details">
      <div className="card-header p-0">
        {challenge?.category == "nutrition" && (
          <img
            src={nutritionImg}
            className="w-100"
            style={{ height: "450px" }}
          />
        )}
        {challenge?.category == "fitness" && (
          <img src={fitness} className="w-100" style={{ height: "400px" }} />
        )}
        {challenge?.category == "mental" && (
          <img src={mentalImg} className="w-100" style={{ height: "400px" }} />
        )}
      </div>
      <div className="card-body d-flex flex-column gap-5">
        <div className="d-flex  gap-4 challenge-chips">
          <div className=" d-flex align-items-center fw-bold ">
            Difficulty:
            <div className="  px-1  fw-bold text-danger ">
              {challenge?.difficulty}
            </div>
          </div>
          <div className=" d-flex align-items-center gap-1 fw-bold">
            Duration days:
            <div className=" text-danger  fw-bold">
              {challenge?.duration_days}
            </div>
          </div>
        </div>
        <div className="d-flex flex-column align-items-center text-center gap-2">
          <h5 className="fs-4">{challenge?.title}</h5>
          <p className="challenge-description">{challenge?.description}</p>
          <div className="d-flex gap-3">
            {challenge?.benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-primary-subtle px-2 py-2 text-primary border border-primary fw-bold rounded-2 challenge-benefit "
              >
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChallengeDetails;
