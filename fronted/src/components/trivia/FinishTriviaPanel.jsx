function FinishTriviaPanel({ onStartAgain }) {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center gap-4 border border-black h-50 p-4 my-5 bg-white rounded-3">
      <h2>Finished Questions 🏆</h2>
      <button className="btn btn-primary p-2 fs-5 " onClick={onStartAgain}>
        Start Again?
      </button>
    </div>
  );
}

export default FinishTriviaPanel;
