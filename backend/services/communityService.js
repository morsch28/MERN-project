import { UserChallenge } from "../model/userChallenge.js";
// import Community from "../model/Community";

async function getCommunityFeed() {
  const feed = await UserChallenge.find({ status: "done" })
    .sort({ completedDate: -1, _id: -1 })
    .select("userId challengeId feedback completedDate createdAt")
    .populate("userId", "name image")
    .populate("challengeId", "title category")
    .lean();
  if (!feed) {
    return { status: false, msg: "Can't find completed challenges" };
  }
  return {
    status: true,
    msg: "return completed challenges successfully",
    data: feed,
  };
}

const communityService = {
  getCommunityFeed,
};

export default communityService;
