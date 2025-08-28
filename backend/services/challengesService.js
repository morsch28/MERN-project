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

async function getChallengeDetails(id) {
  if (!id) {
    return { status: false, msg: "missing parameters" };
  }
  const challenge = await Challenge.findById(id);
  if (!challenge) {
    return { status: false, msg: "challenge details not found" };
  }
  return {
    status: true,
    msg: "return challenge details successfully",
    data: challenge,
  };
}

async function deleteChallenge(id, isAdmin) {
  if (!id) {
    return { status: false, msg: "missing parameters" };
  }
  if (!isAdmin) {
    return { status: false, msg: "Unauthorized" };
  }
  const challengeToDelete = await Challenge.findByIdAndUpdate(
    id,
    {
      $set: { isDeleted: true },
    },
    { new: true }
  );
  if (!challengeToDelete) {
    return { status: false, msg: "not found challenge to delete" };
  }
  return {
    status: true,
    msg: "return deleted challenge",
    data: challengeToDelete,
  };
}
async function updateChallenge(id, values, isAdmin) {
  if (!id) {
    return { status: false, msg: "missing parameters" };
  }
  if (!isAdmin) {
    return { status: false, msg: "Unauthorized" };
  }
  const challengeToUpdate = await Challenge.findByIdAndUpdate(
    id,
    {
      $set: values,
    },
    { new: true, runValidators: true }
  );
  if (!challengeToUpdate) {
    return { status: false, msg: "not found challenge to update" };
  }
  return {
    status: true,
    msg: "return updated challenge",
    data: challengeToUpdate,
  };
}

const challengesService = {
  createChallenge,
  getAllChallenges,
  getCompletedChallenges,
  getChallengeDetails,
  deleteChallenge,
  updateChallenge,
};
export default challengesService;
