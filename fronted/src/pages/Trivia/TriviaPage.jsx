import { useEffect, useState } from "react";
import quizzesService from "../../services/quizzesService";
import TriviaModal from "../../components/trivia/TriviaModal";
import { Prev } from "react-bootstrap/esm/PageItem";

function TriviaPage() {
  const [randomQuestion, setRandomQuestion] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);
  //24 questions
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const COUNT = 6;
  const Total = 24;

  const showModal = () => {
    setIsShowModal(true);
  };
  const closeModal = () => {
    setIsShowModal(false);
  };

  const loadRandomQuestion = async () => {
    try {
      const response = await quizzesService.getAllQuestion();
      const newQuestion = response?.data.question;
      setRandomQuestion(newQuestion);
      return response.data;
    } catch (error) {
      console.log("can't load question", error);
    }
  };

  useEffect(() => {
    loadRandomQuestion();
  }, []);

  const createQuestionsArr = () => {
    if (!randomQuestion) {
      return;
    }
    if (questions?.length > 0) {
      const exist = questions.some(
        (question) => question?._id == randomQuestion?._id
      );
      if (!exist) {
        setQuestions((prev) => [...prev, randomQuestion]);
      }
    } else {
      setQuestions([randomQuestion]);
    }
  };

  useEffect(() => {
    createQuestionsArr();
  }, [randomQuestion]);

  useEffect(() => {
    if (questions.length < Total) {
      loadRandomQuestion();
    }
  }, [questions.length]);

  const renderCards = (count) => {
    const questionArr = [];
    for (let i = 0; i < count; i++) {
      questionArr.push(
        <div
          key={i}
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
      <TriviaModal
        onShow={isShowModal}
        onClose={closeModal}
        question={questions[0]}
      />
    </div>
  );
}

export default TriviaPage;
