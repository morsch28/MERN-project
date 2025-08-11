import { Challenge } from "../model/challenge.js";
import { UserChallenge } from "../model/userChallenge.js";
import { challengeValidation } from "../model/challenge.js";

//create challenge
async function createChallenge(values, userIsAdmin) {
  const { error } = challengeValidation.validate(values);
  if (error) {
    return { status: false, msg: "not valid data" };
  }
  if (!userIsAdmin) {
    return { status: false, msg: "UnAuthorize" };
  }
  const newChallenge = new Challenge(values);
  await newChallenge.save();
  return {
    status: true,
    msg: "challenge created successfully",
    data: newChallenge,
  };
}

//get all challenges
async function getAllChallenges() {
  const allChallenges = await Challenge.find();
  if (!allChallenges) {
    return { status: false, msg: "not found any challenges" };
  }
  return {
    status: true,
    msg: "successfully get all challenges",
    data: allChallenges,
  };
}

async function getCompletedChallenges() {
  const allDoneChallenges = await UserChallenge.find({ status: "done" });
  if (!allDoneChallenges || allDoneChallenges.length == 0) {
    return { status: false, msg: "not found any  completed challenges" };
  }
  return {
    status: true,
    msg: "successfully get all completes challenges",
    data: allDoneChallenges,
  };
}

const challengesService = {
  createChallenge,
  getAllChallenges,
  getCompletedChallenges,
};
export default challengesService;
