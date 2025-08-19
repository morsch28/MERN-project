import { useEffect, useState } from "react";
import quizzesService from "../../services/quizzesService";

function TriviaPage() {
  const [question, setQuestion] = useState(null);
  const COUNT = 6;

  useEffect(() => {
    const loadAllQuestions = async () => {
      try {
        const response = await quizzesService.getAllQuestion();
        console.log("count", response.data.totalCount);
        setQuestion(response.data.question);
        return response.data;
      } catch (error) {
        console.log("can't load question", error);
      }
    };
    loadAllQuestions();
  }, []);

  const renderCards = (count) => {
    const questionArr = [];
    for (let i = 0; i < count; i++) {
      questionArr.push(
        <div className="bg-black border border-white trivia-cards border-2 d-flex flex-column text-white fs-4 fw-bold">
          <span className="card-mark">?</span>
          Trivia
        </div>
      );
    }
    return questionArr;
  };

  return (
    <div className="container my-2 d-flex justify-content-center">
      <div className="trivia-deck">
        {COUNT > 0 ? renderCards(COUNT) : <div>No Cards to show</div>}
      </div>
    </div>
  );
}

export default TriviaPage;
