import { useEffect, useState } from "react";
import quizzesService from "../../services/quizzesService";
import TriviaModal from "../../components/trivia/TriviaModal";
import { Prev } from "react-bootstrap/esm/PageItem";

function TriviaPage() {
  const COUNT = 6;
  const [isShowModal, setIsShowModal] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [deckOfCards, setDeckOfCards] = useState([]);
  const [correctIndex, setCorrectIndex] = useState(null);
  const [wrongIndex, setWrongIndex] = useState(null);
  const [numberOfCards, setNumberOfCards] = useState(COUNT);
  const [questionId, setQuestionId] = useState([]);

  const Total = 24;

  const shuffle = (arr) => {
    return arr
      ?.slice()
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);
  };

  const showModal = () => {
    setIsShowModal(true);
    setCorrectIndex(null);
    setWrongIndex(null);
  };
  const closeModal = () => {
    setIsShowModal(false);
    setCorrectIndex(null);
    setWrongIndex(null);
  };

  const getAllQuestions = async () => {
    try {
      const response = await quizzesService.getAllQuestions();
      const shuffledCards = shuffle(response?.data);
      // setQuestions(response?.data);
      setDeckOfCards(shuffledCards);
      setCorrectIndex(null);
      return response.data;
    } catch (error) {
      console.log("can't load question", error);
    }
  };

  useEffect(() => {
    getAllQuestions();
  }, []);

  const handleAnswer = async (questionId, index) => {
    try {
      const response = await quizzesService.getCorrectAnswer(questionId);
      const answer = response?.data;
      if (answer == index) {
        setCorrectIndex(index);
        setNumberOfCards((prev) => Math.max(prev - 1, 0));
        setDeckOfCards((prev) => {
          const nextDeck = prev.filter(
            (question) => question._id != questionId
          );
          if (nextDeck.length == 0) {
            closeModal();
          } else {
            setCorrectIndex(null);
            setWrongIndex(null);
          }
          return nextDeck;
        });
      } else {
        setWrongIndex(index);
        setTimeout(() => {
          setDeckOfCards((prev) => {
            if (prev.length <= 1) {
              return prev;
            }
            const shuffled = shuffle(prev);
            setCorrectIndex(null);
            setWrongIndex(null);
            return shuffled;
          });
          closeModal();
        }, 1000);
      }
      console.log(response);
    } catch (error) {
      console.log("cant get correct answer", error);
    }
  };

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

  const currentQuestion = deckOfCards[0];

  return (
    <div className="container my-2 d-flex justify-content-center">
      <div className="trivia-deck">
        {numberOfCards > 0 ? (
          renderCards(numberOfCards)
        ) : (
          <div>No Cards to show</div>
        )}
      </div>
      <TriviaModal
        onShow={isShowModal}
        onClose={closeModal}
        question={currentQuestion}
        onAnswer={handleAnswer}
        correct={correctIndex}
        wrong={wrongIndex}
      />
    </div>
  );
}

export default TriviaPage;
