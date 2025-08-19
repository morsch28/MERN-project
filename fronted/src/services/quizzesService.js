import httpServices from "./httpServices.js";

async function getAllQuestion() {
  const response = await httpServices.get("quizzes/questions");
  return response;
}

async function checkCorrectAnswer(questionId, indexOfAnswer) {
  const response = await httpServices.post("quizzes/answer", {
    questionId,
    indexOfAnswer,
  });
  return response;
}

async function getCorrectAnswer(id) {
  const response = await httpServices.get(`quizzes/correct/${id}`);
  return response;
}

const quizzesService = {
  getAllQuestion,
  checkCorrectAnswer,
  getCorrectAnswer,
};
export default quizzesService;
