import httpServices from "./httpServices";

async function getAllChallenges() {
  const response = await httpServices.get("/challenges");
  return response;
}

async function addChallengeToList(id) {
  const response = await httpServices.post(
    `/user-challenges/choose-challenge/${id}`
  );
  return response;
}

async function getAllUserChallenges(id) {
  const response = await httpServices.get(`/user-challenges/action/${id}`);
  return response;
}

async function updateChallenge(id, updateData) {
  const response = await httpServices.put(
    `user-challenges/action/${id}`,
    updateData
  );
  return response;
}

const challengeService = {
  getAllChallenges,
  addChallengeToList,
  getAllUserChallenges,
  updateChallenge,
};
export default challengeService;
