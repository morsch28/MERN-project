import { useEffect, useState } from "react";
import communityService from "../../services/communityService";

function Community() {
  const [completedChallenges, setCompletedChallenges] = useState([]);

  const nameToUpperCase = (name) => {
    return name
      .split(" ")
      .filter(Boolean) // מסיר רווחים מיותרים
      .map((word) => word[0]?.toUpperCase() || "")
      .join("")
      .slice(0, 2);
  };

  useEffect(() => {
    const loadCompletedChallenges = async () => {
      try {
        const response = await communityService.getCompletedChallenges();
        console.log("data", response.data);
        console.log("data data", response.data.data);

        setCompletedChallenges(response.data);

        return response.data;
      } catch (error) {
        console.log(error);
      }
    };
    loadCompletedChallenges();
  }, []);

  const completed = completedChallenges.slice(0, 6);

  return (
    <div className="d-flex  w-50 gap-2  h-75 mt-4 flex-column">
      {completed.map((challenge) => {
        const firstName = challenge.userId?.name?.first;
        const lastName = challenge.userId?.name?.last;
        const fullName = `${firstName} ${lastName}`;
        const userName = nameToUpperCase(fullName);
        const date = new Date(challenge.completedDate);
        const formatDate = date.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });

        const imagePath = challenge.userId?.image?.url;
        const imageUrl = imagePath ? `http://localhost:3000${imagePath}` : null;

        return (
          <div className="card text-center w-100" key={challenge._id}>
            <div className="card-header d-flex justify-content-between">
              <div className="d-flex gap-2">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      backgroundColor: "blue",
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "1.2rem",
                    }}
                  >
                    {userName}
                  </div>
                )}
                <div className="d-flex flex-column">
                  <div className="fw-bold fs-5">{firstName}</div>
                  <div>Complete Challenge - {formatDate}</div>
                </div>
              </div>
              <div
                className={`p-2 h-25 ${
                  challenge.challengeId?.category === "nutrition"
                    ? "bg-success-subtle text-success"
                    : challenge.challengeId?.category === "mental"
                    ? "bg-info-subtle text-info"
                    : "bg-warning-subtle text-warning"
                }`}
              >
                {challenge.challengeId?.category}
              </div>
            </div>
            <div className="card-body d-flex flex-column align-items-center">
              <h5 className="card-title">{challenge.challengeId.title}</h5>
              {challenge.feedback && (
                <p className="card-text bg-body-secondary p-1 rounded-2 w-75">
                  {challenge.feedback?.text}
                </p>
              )}
            </div>
            <div className="card-footer text-body-secondary">2 days ago</div>
          </div>
        );
      })}
    </div>
  );
}

export default Community;
