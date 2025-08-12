function ChallengeProgress({ progress, daysNumber, totalDays }) {
  const p = Math.max(0, Math.min(progress));

  return (
    <div className="d-flex flex-column align-items-center w-100 py-2">
      <div className="c-progress" style={{ "--p": p }}>
        <span>{p}%</span>
      </div>
      <div className="c-days text-nowrap">
        days {daysNumber} of {totalDays}
      </div>
    </div>
  );
}

export default ChallengeProgress;
