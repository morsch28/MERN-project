import httpServices from "./httpServices";

async function getCompletedChallenges() {
  const response = await httpServices.get("/community");
  return response;
}

const communityService = {
  getCompletedChallenges,
};
export default communityService;
