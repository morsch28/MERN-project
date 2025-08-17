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
async function deleteComment(id) {
  const response = await httpServices.delete(`/community/comment/${id}`);
  return response;
}
async function updateComment(commentId, newText) {
  const response = await httpServices.put(`/community/comment/${commentId}`, {
    newComment: newText,
  });
  return response;
}

const communityService = {
  getCompletedChallenges,
  addCommentToChallenge,
  deleteComment,
  updateComment,
};
export default communityService;
