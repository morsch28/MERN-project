function TriviaStatusCards({ title, main, sub }) {
  return (
    <div className="bg-white d-flex flex-column justify-content-space-around align-items-center gap-2 p-2 text-center border border-black rounded-2 trivia-status">
      <h4 className="trivia-title" style={{ flex: 1 }}>
        {title}
      </h4>
      <span className="trivia-main">{main}</span>
      <span className="trivia-aub" style={{ flex: 1 }}>
        {sub}
      </span>
    </div>
  );
}

export default TriviaStatusCards;
