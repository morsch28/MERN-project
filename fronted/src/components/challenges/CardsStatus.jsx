function CardsStatus() {
  const fourChallengesCard = [
    {
      title: "completed",
      icon: "bi bi-trophy",
      count: 0,
      bgColor: "bg-success-subtle",
      txColor: "text-success",
    },
    {
      title: "in-progress",
      icon: "bi bi-life-preserver",
      count: 0,
      bgColor: "bg-primary-subtle",
      txColor: "text-primary",
    },
    {
      title: "pending",
      icon: "bi bi-calendar",
      count: 0,
      bgColor: "bg-warning-subtle",
      txColor: "text-warning",
    },
    {
      title: "total",
      icon: "bi bi-stars",
      count: 0,
      bgColor: "bg-danger-subtle",
      txColor: "text-danger",
    },
  ];

  return (
    <div
      className="d-flex  gap-3 container justify-content-center align-items-center"
      style={{ height: "100px" }}
    >
      {fourChallengesCard.map((challenge) => (
        <div
          key={challenge.title}
          className="card text-center d-flex justify-content-center align-items-center home-page-cards mt-2"
          style={{ width: "8rem", height: "8rem", borderRadius: "20px" }}
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
