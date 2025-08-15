import mongoose from "mongoose";
import { UserChallenge, commentsValidation } from "../model/userChallenge.js";
// import Community from "../model/Community";

async function getCommunityFeed() {
  const feed = await UserChallenge.find({ status: "done" })
    .sort({ completedDate: -1, _id: -1 })
    .select("userId challengeId feedback completedDate createdAt comments")
    .populate("userId", "name image")
    .populate("challengeId", "title category")
    .populate("comments.userId", "name image")
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

async function addComment(userChallengeId, userId, text) {
  try {
    if (!userChallengeId || !userId || !text) {
      return { status: false, msg: "missing parameters" };
    }
    const { error } = commentsValidation.validate(text);
    if (error) {
      return { status: false, msg: error.details[0].message };
    }
    const currentChallenge = await UserChallenge.findById(userChallengeId);
    if (!currentChallenge) {
      return { status: false, msg: "can't found challenge to add comment" };
    }
    currentChallenge.comments.push({
      userId: userId,
      text: text.trim(),
    });

    await currentChallenge.save();

    const newComment =
      currentChallenge.comments[currentChallenge.comments.length - 1];

    return {
      status: true,
      msg: "comment created successfully",
      data: newComment,
    };
  } catch (error) {
    return { status: false, msg: error.message };
  }
}

const communityService = {
  getCommunityFeed,
  addComment,
};

export default communityService;
