import TriviaStatusCards from "../trivia/TriviaStatusCards";

function TriviaScoreBoard({ correct, total, answered, cardsInDeck }) {
  const grade = Math.round((correct * 100) / total);
  return (
    <div className=" d-flex  gap-3 trivia-board w-100 justify-content-center mt-2">
      <TriviaStatusCards
        title="Aggregate score"
        main={`${grade}%`}
        sub={`${correct} out of ${answered}`}
      />
      <TriviaStatusCards
        title="Answered Questions"
        main={answered}
        sub={`Out of ${total} questions`}
      />
      <TriviaStatusCards
        title="Cards in deck"
        main={cardsInDeck}
        sub={`left to draw`}
      />
    </div>
  );
}

export default TriviaScoreBoard;
