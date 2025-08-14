import httpServices from "./httpServices";

async function getCompletedChallenges() {
  const response = await httpServices.get("/community");
  return response;
}

async function addCommentToChallenge(id, text) {
  const response = await httpServices.post(`/community/comment/${id}`, {
    text,
  });
  return response;
}

const communityService = {
  getCompletedChallenges,
  addCommentToChallenge,
};
export default communityService;
