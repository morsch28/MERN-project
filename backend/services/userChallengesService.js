import { UserChallenge } from "../model/userChallenge.js";
import { Challenge } from "../model/challenge.js";

async function chooseChallenge(idOfUser, idOfChallenge) {
  if (!idOfUser || !idOfChallenge) {
    return false;
  }
  const challengeExist = await UserChallenge.findOne({
    userId: idOfUser,
    challengeId: idOfChallenge,
  });
  if (challengeExist) {
    return false;
  }
  const newUserChallenge = await new UserChallenge({
    userId: idOfUser,
    challengeId: idOfChallenge,
    status: "pending",
  }).save();

  return newUserChallenge;
}

async function completedUserChallenges(paramsId) {
  if (!paramsId) {
    return false;
  }
  const completedChallenges = await UserChallenge.find({
    userId: paramsId,
    status: "done",
  });
  if (!completedChallenges) {
    return false;
  }
  return completedChallenges;
}

async function statusInPercent(paramsId) {
  const currChallenge = await UserChallenge.findById(paramsId);
  if (!currChallenge) {
    return false;
  }
  const challenge = await Challenge.findById(currChallenge.challengeId);
  if (!challenge) {
    return false;
  }

  const start = new Date(currChallenge.startDate);
  const today = new Date();
  const diffDays = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  const totalDays = challenge.duration_days;
  const progress =
    currChallenge.status == "done"
      ? 100
      : Math.min(Math.round((diffDays / totalDays) * 100), 100);

  return { progress: progress, status: currChallenge.status };
}

const userChallengeService = {
  chooseChallenge,
  completedUserChallenges,
  statusInPercent,
};
export default userChallengeService;
