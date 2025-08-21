import { useEffect, useState } from "react";
import quizzesService from "../../services/quizzesService";
import TriviaModal from "../../components/trivia/TriviaModal";

function TriviaPage() {
  const [isShowModal, setIsShowModal] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsTotal, setCardsTotal] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(6);

  const showModal = (id) => {
    setQuestions((prev) => prev.filter((que) => que._id !== id));
    setIsShowModal(true);
  };
  const closeModal = (status) => {
    setCardsToShow((prev) => prev - 1);
    // if status == true => setCorrectAnswers(prev => prev + 1)
    // else  status == false => setWrongAnswers(prev => prev + 1)
    setIsShowModal(false);
  };

  useEffect(() => {
    const loadAllQuestions = async () => {
      try {
        const response = await quizzesService.getAllQuestions();
        if (!response || !response.data?.length) {
          // TODO: no cards to show
        }
        setQuestions(response.data?.questions);
        setCardsTotal(questions?.length);
      } catch (error) {
        console.log("can't load question", error);
      }
    };
    loadAllQuestions();
  }, [questions?.length]);

  const renderCards = () => {
    const shuffled = questions.sort(() => Math.random() - 0.5).slice(0, 6);
    const questionArr = [];
    for (const question in shuffled) {
      questionArr.push(
        <div
          key={question._id}
          className="bg-black border border-white trivia-cards border-2 d-flex flex-column text-white fs-4 fw-bold"
          onClick={showModal(question._id)}
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
        <div
          key={question._id}
          className="bg-black border border-white trivia-cards border-2 d-flex flex-column text-white fs-4 fw-bold"
          onClick={showModal(question._id)}
        >
          <span className="card-mark">?</span>
          Trivia
        </div>
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
