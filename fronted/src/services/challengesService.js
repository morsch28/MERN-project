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
  const response = await httpServices.get(`/user-challenges/${id}`);
  return response;
}

async function updateChallenge(id, updateData) {
  const response = await httpServices.put(`user-challenges/${id}`, updateData);
  return response;
}

async function uploadImage(formData) {
  const response = await httpServices.post("upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
}

const challengeService = {
  getAllChallenges,
  addChallengeToList,
  getAllUserChallenges,
  updateChallenge,
  uploadImage,
};
export default challengeService;
