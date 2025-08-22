import Quiz from "../model/quiz.js";

async function getAllQuestions() {
  const questions = await Quiz.find().select("question answers");

  return {
    status: true,
    msg: "return question successfully",
    data: questions,
  };
}

async function getCorrectAnswer(questionId) {
  if (!questionId) {
    return { status: false, msg: "missing parameters" };
  }
  const question = await Quiz.findById(questionId).select("correctAnswer");
  if (!question) {
    return { status: false, msg: "question not found" };
  }
  const correct = question.correctAnswer;

  return {
    status: true,
    msg: "return correct answer successfully",
    data: correct,
  };
}

const quizzesService = {
  getAllQuestions,
  getCorrectAnswer,
};

export default quizzesService;
