import { useEffect, useState } from "react";
import quizzesService from "../../services/quizzesService";
import TriviaModal from "../../components/trivia/TriviaModal";

function TriviaPage() {
  const [question, setQuestion] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);

  //24 questions
  const [questions, setQuestions] = useState([]);
  const COUNT = 6;

  const showModal = () => {
    setIsShowModal(true);
  };
  const closeModal = () => {
    setIsShowModal(false);
  };

  useEffect(() => {
    const loadAllQuestions = async () => {
      try {
        const response = await quizzesService.getAllQuestion();
        console.log("count", response.data.totalCount);
        console.log("question", response.data);
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
        <div
          className="bg-black border border-white trivia-cards border-2 d-flex flex-column text-white fs-4 fw-bold"
          onClick={showModal}
        >
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
      <TriviaModal onShow={isShowModal} onClose={closeModal} />
    </div>
  );
}

export default TriviaPage;
