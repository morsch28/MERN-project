import httpServices from "./httpServices";

async function getAllChallenges() {
  const response = await httpServices.get("/challenges");
  return response;
}

async function addChallengeToList(id) {
  const response = await httpServices.post(
    `/challenges/choose-challenge/${id}`
  );
  return response;
}

async function getAllUserChallenges(id) {
  const response = await httpServices.get(`challenges/${id}`);
  return response;
}

// async function getChallengesByCategory(category) {
//   const response = await httpServices.get(`/challenges/all/${category}`);
//   return response;
// }

const challengeService = {
  getAllChallenges,
  addChallengeToList,
  getAllUserChallenges,
  // getChallengesByCategory,
};
export default challengeService;
