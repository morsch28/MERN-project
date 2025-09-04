import httpServices from "./httpServices.js";

async function getAllQuestions() {
  const response = await httpServices.get("/quizzes");
  return response;
}

async function getCorrectAnswer(id) {
  const response = await httpServices.get(`/quizzes/${id}`);
  return response;
}

const quizzesService = {
  getAllQuestions,
  getCorrectAnswer,
};
export default quizzesService;
