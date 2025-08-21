import httpServices from "./httpServices.js";

async function getAllQuestions() {
  const response = await httpServices.get("quizzes");
  return response;
}

async function checkCorrectAnswer(questionId, indexOfAnswer) {
  const response = await httpServices.post("quizzes", {
    questionId,
    indexOfAnswer,
  });
  return response;
}

const quizzesService = {
  getAllQuestions,
  checkCorrectAnswer,
};
export default quizzesService;
