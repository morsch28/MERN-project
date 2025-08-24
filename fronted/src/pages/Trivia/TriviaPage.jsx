import { useEffect, useState } from "react";
import quizzesService from "../../services/quizzesService";
import TriviaModal from "../../components/trivia/TriviaModal";
import TriviaScoreBoard from "../../components/trivia/TriviaScoreBoard";
import TriviaCards from "../../components/trivia/TriviaCards";
import FinishTriviaPanel from "../../components/trivia/FinishTriviaPanel";

function TriviaPage() {
  const COUNT = 8;
  const Total = 24;
  const [isShowModal, setIsShowModal] = useState(false);
  const [nextDeck, setNextDeck] = useState([]);
  const [deckOfCards, setDeckOfCards] = useState([]);
  const [correctIndex, setCorrectIndex] = useState(null);
  const [wrongIndex, setWrongIndex] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);

  const shuffle = (arr) => {
    return arr?.slice().sort(() => Math.random() - 0.5);
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

  const newDeck = (currentDeck) => {
    setDeckOfCards(currentDeck.slice(0, COUNT));
    setNextDeck(currentDeck.slice(COUNT));
  };

  const getAllQuestions = async () => {
    try {
      setCorrectIndex(null);
      setWrongIndex(null);
      setAnsweredQuestions(0);
      setCorrectAnswer(0);
      const response = await quizzesService.getAllQuestions();
      const allQuestions = shuffle(response?.data);
      newDeck(allQuestions);
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
      setAnsweredQuestions((prev) => prev + 1);
      setTimeout(() => {
        closeModal();
        setDeckOfCards((prev) => {
          const next = prev.filter((question) => question._id !== questionId);
          if (next.length === 0) {
            if (nextDeck.length > 0) {
              shuffle(nextDeck);
              newDeck(nextDeck);
            }
          }
          shuffle(next);
          return next;
        });
      }, 1000);
      if (answer == index) {
        setCorrectAnswer((prev) => prev + 1);
        setCorrectIndex(index);
      } else {
        setWrongIndex(index);
      }
      console.log(response);
    } catch (error) {
      console.log("cant get correct answer", error);
    }
  };

  const finish = deckOfCards.length == 0 && nextDeck.length == 0;

  return (
    <div className="container d-flex flex-column align-items-center  w-100  gap-4 justify-content-center trivia-container">
      <TriviaScoreBoard
        correct={correctAnswer}
        total={Total}
        answered={answeredQuestions}
        cardsInDeck={deckOfCards.length}
      />
      {!finish ? (
        deckOfCards.length > 0 && (
          <TriviaCards count={deckOfCards.length} onCardClick={showModal} />
        )
      ) : (
        <FinishTriviaPanel onStartAgain={getAllQuestions} />
      )}

      <TriviaModal
        onShow={isShowModal}
        onClose={closeModal}
        question={deckOfCards[0]}
        onAnswer={handleAnswer}
        correct={correctIndex}
        wrong={wrongIndex}
      />
    </div>
  );
}

export default TriviaPage;
