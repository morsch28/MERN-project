import { useMyChallenges } from "../../context/challenges.context";

function CardsStatus() {
  const { myChallenges } = useMyChallenges();
  const list = myChallenges?.data || [];

  const pendingChallenges = list.filter(
    (challenge) => challenge.status == "pending"
  );
  const inProgressChallenges = list.filter(
    (challenge) => challenge.status == "in-progress"
  );

  const completedChallenges = list.filter(
    (challenge) => challenge.status == "done"
  );

  const fourChallengesCard = [
    {
      title: "completed",
      icon: "bi bi-trophy",
      count: completedChallenges.length,
      bgColor: "bg-success-subtle",
      txColor: "text-success",
    },
    {
      title: "in-progress",
      icon: "bi bi-life-preserver",
      count: inProgressChallenges.length,
      bgColor: "bg-primary-subtle",
      txColor: "text-primary",
    },
    {
      title: "pending",
      icon: "bi bi-calendar",
      count: pendingChallenges.length,
      bgColor: "bg-warning-subtle",
      txColor: "text-warning",
    },
    {
      title: "total",
      icon: "bi bi-stars",
      count: list.length,
      bgColor: "bg-danger-subtle",
      txColor: "text-danger",
    },
  ];

  return (
    <div className="d-flex  gap-3 container justify-content-center align-items-center">
      {fourChallengesCard.map((challenge) => (
        <div
          key={challenge.title}
          className="card text-center d-flex justify-content-center align-items-center home-page-cards mt-2"
          style={{
            maxWidth: "200px",
            height: "auto",
            gap: "6px",
            borderRadius: "20px",
            padding: "20px 0",
            flex: 1,
          }}
        >
          <div
            className={`${challenge.bgColor}  ${challenge.txColor} rounded-5 d-flex align-items-center justify-content-center fs-2`}
            style={{ width: "50px", height: "50px" }}
          >
            <i className={`${challenge.icon}`}></i>
          </div>
          <div className="fs-4 fw-bold">{challenge.count}</div>
          <div className="cardsStatus-title">{challenge.title}</div>
        </div>
      ))}
    </div>
  );
}

export default CardsStatus;
