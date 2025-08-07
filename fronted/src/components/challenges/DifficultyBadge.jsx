function DifficultyBadge({ difficulty }) {
  return (
    <div
      className={`p-1 fw-bold rounded-2 ${
        difficulty === "easy"
          ? "bg-success-subtle text-success"
          : difficulty === "medium"
          ? "bg-warning-subtle text-warning"
          : "text-danger bg-danger-subtle"
      }`}
    >
      {difficulty}
    </div>
  );
}

export default DifficultyBadge;
