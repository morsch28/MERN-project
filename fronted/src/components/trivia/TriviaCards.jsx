function TriviaCards({ count, onCardClick }) {
  if (!count) {
    return;
  }
  const questions = [];
  for (let i = 0; i < count; i++) {
    questions.push(
      <div
        key={i}
        className="bg-black  trivia-cards border-2 d-flex flex-column text-white fs-5 fw-bold justify-content-center"
        onClick={onCardClick}
      >
        <span className="card-mark">?</span>
        Trivia
      </div>
    );
  }
  return <div className="trivia-deck">{questions}</div>;
}

export default TriviaCards;
