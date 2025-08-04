import { UserChallenge } from "../model/userChallenge.js";

async function getUserChallenges(idUserParam) {
  if (!idUserParam) {
    return false;
  }
  const challengesOfUser = await UserChallenge.find({
    userId: idUserParam,
  }).populate("challengeId");

  if (!challengesOfUser) {
    return false;
  }
  return challengesOfUser;
}

async function updateUserChallenge(challengeId, values, userId) {
  if (!challengeId || !values || !userId) {
    return false;
  }
  const challenge = await UserChallenge.findById(challengeId);
  if (!challenge) {
    return false;
  }
  if (String(challenge.userId) !== userId) {
    return false;
  }
  if (values.status == "done") {
    values.completedDate = new Date();
  }
  const challengeToUpdate = await UserChallenge.findByIdAndUpdate(
    challengeId,
    values,
    { new: true }
  );
  return challengeToUpdate;
}

async function deleteUserChallenge(paramsId, idOfUser) {
  if (!paramsId || !idOfUser) {
    return false;
  }
  const challenge = await UserChallenge.findById(paramsId);
  if (!challenge) {
    return false;
  }
  if (String(challenge.userId) != idOfUser) {
    return false;
  }
  const challengeToDelete = await UserChallenge.findByIdAndDelete(paramsId);
  if (!challengeToDelete) {
    return false;
  }
  return challengeToDelete;
}

const userChallengesActionSrv = {
  getUserChallenges,
  updateUserChallenge,
  deleteUserChallenge,
};

export default userChallengesActionSrv;
