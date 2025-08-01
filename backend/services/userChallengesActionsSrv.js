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

async function updateUserChallenge(userIdParam, values) {
  if (!userIdParam || !values) {
    return false;
  }
  const challenge = await UserChallenge.findById(userIdParam);
  if (!challenge) {
    return false;
  }
  if (String(challenge.userId) !== userIdParam) {
    return res.status(401).send("Access denied");
  }
  const challengeToUpdate = await UserChallenge.findByIdAndUpdate(
    userIdParam,
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
