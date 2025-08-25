function TriviaStatusCards({ title, main, sub }) {
  return (
    <div className="bg-white d-flex flex-column justify-content-center align-items-center gap-2 p-3 text-center border border-black rounded-2 trivia-status">
      <strong className="trivia-title">{title}</strong>
      <p className="trivia-main">{main}</p>
      <p className="trivia-aub">{sub}</p>
    </div>
  );
}

export default TriviaStatusCards;
