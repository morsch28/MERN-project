function FinishTriviaPanel({ onStartAgain }) {
  return (
    <div className="d-flex flex-column justify-content-center gap-4 border border-black h-50 p-4 my-5 bg-white rounded-3">
      <h2>Finished Questions 🏆</h2>
      <button className="btn btn-primary p-2" onClick={onStartAgain}>
        Game Again
      </button>
    </div>
  );
}

export default FinishTriviaPanel;
