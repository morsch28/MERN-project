import Quiz from "../model/quiz.js";

async function getAllQuestions() {
  const questions = await Quiz.find().select("_id question answers");
  return {
    status: true,
    msg: "return question successfully",
    data: { questions },
  };
}

async function getCorrectAnswer(questionId) {
  if (!questionId) {
    return { status: false, msg: "Cant find question" };
  }
  const question = await Quiz.findById(questionId);
  if (!question) {
    return { status: false, msg: "not found question" };
  }
  const correct = question.correctAnswer;

  return {
    status: true,
    msg: "get correct answer",
    data: correct,
  };
}

const quizzesService = {
  getAllQuestions,
  getCorrectAnswer,
};

export default quizzesService;
