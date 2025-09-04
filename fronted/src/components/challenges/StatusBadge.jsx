function StatusBadge({ status }) {
  return (
    <div
      className={`rounded-3 border fw-bold rounded-3 p-1 ${
        status == "pending"
          ? "bg-warning-subtle text-warning"
          : status == "in-progress"
          ? `bg-info-subtle text-info text-nowrap`
          : `bg-success-subtle text-success p-3`
      }`}
      style={{
        maxHeight: "40%",
        display: "flex",
        alignItems: "center",
      }}
    >
      {status}
    </div>
  );
}

export default StatusBadge;
