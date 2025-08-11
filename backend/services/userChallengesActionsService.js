import { UserChallenge } from "../model/userChallenge.js";
import { userChallengeValidation } from "../model/userChallenge.js";

async function getUserChallenges(idUserParam) {
  if (!idUserParam) {
    return { status: false, msg: "missing parameters" };
  }
  const challengesOfUser = await UserChallenge.find({
    userId: idUserParam,
  }).populate("challengeId");

  if (!challengesOfUser) {
    return { status: false, msg: "not found user's challenges" };
  }
  return {
    status: true,
    msg: "user's challenges successfully",
    data: challengesOfUser,
  };
}

async function updateUserChallenge(challengeId, values, userId) {
  const { error } = userChallengeValidation.validate(values);
  if (error) {
    return { status: false, msg: "not valid data" };
  }
  if (!challengeId || !values || !userId) {
    return { status: false, msg: "missing parameters" };
  }
  const challenge = await UserChallenge.findById(challengeId);
  if (!challenge) {
    return { status: false, msg: "Not found challenge to update" };
  }
  if (String(challenge.userId) !== userId) {
    return { status: false, msg: "Unauthorize" };
  }
  if (challenge.status == "pending" && values.status == "in-progress") {
    if (!challenge.startDate) {
      values.startDate = new Date();
    }
  }
  if (values.status == "done") {
    values.completedDate = new Date();
  }
  const challengeToUpdate = await UserChallenge.findByIdAndUpdate(
    challengeId,
    { $set: values },
    { new: true, runValidators: true, omitUndefined: true }
  );
  return { status: true, msg: "Challenge updated", data: challengeToUpdate };
}

async function deleteUserChallenge(paramsId, idOfUser) {
  if (!paramsId || !idOfUser) {
    return { status: false, msg: "missing params" };
  }
  const challenge = await UserChallenge.findById(paramsId);
  if (!challenge) {
    return { status: false, msg: "not found challenge to delete" };
  }
  if (String(challenge.userId) != idOfUser) {
    return { status: false, msg: "Unauthorize" };
  }
  const challengeToDelete = await UserChallenge.findByIdAndDelete(paramsId);
  if (!challengeToDelete) {
    return { status: false, msg: "not found challenge to delete" };
  }
  return { status: true, msg: "Challenge deleted", data: challengeToDelete };
}

const userChallengesActionsService = {
  getUserChallenges,
  updateUserChallenge,
  deleteUserChallenge,
};

export default userChallengesActionsService;
