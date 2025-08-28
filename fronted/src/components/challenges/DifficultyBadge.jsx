function DifficultyBadge({ difficulty }) {
  return (
    <div
      className={`p-1 fw-bold rounded-2 ${
        difficulty === "easy"
          ? "bg-success-subtle text-success border border-success"
          : difficulty === "medium"
          ? "bg-warning-subtle text-warning border border-warning"
          : "bg-danger-subtle text-danger border border-danger"
      }`}
    >
      {difficulty}
    </div>
  );
}

export default DifficultyBadge;
