import { UserChallenge } from "../model/userChallenge.js";
import { Challenge } from "../model/challenge.js";

async function chooseChallenge(idOfUser, idOfChallenge) {
  if (!idOfUser || !idOfChallenge) {
    return { status: false, msg: "missing parameters" };
  }
  const challengeExist = await UserChallenge.findOne({
    userId: idOfUser,
    challengeId: idOfChallenge,
  });
  if (challengeExist) {
    return { status: false, msg: "challenge is already exist" };
  }
  const newUserChallenge = await new UserChallenge({
    userId: idOfUser,
    challengeId: idOfChallenge,
    status: "pending",
  }).save();

  return {
    status: true,
    msg: "choose challenge successfully",
    data: newUserChallenge,
  };
}

async function completedUserChallenges(paramsId) {
  if (!paramsId) {
    return { status: false, msg: "missing parameters" };
  }
  const completedChallenges = await UserChallenge.find({
    userId: paramsId,
    status: "done",
  });
  if (!completedChallenges) {
    return { status: false, msg: "not found the completed user challenges" };
  }
  return {
    status: true,
    msg: "done loaded all user completes challenges",
    date: completedChallenges,
  };
}

async function statusInPercent(paramsId) {
  const currChallenge = await UserChallenge.findById(paramsId);
  if (!currChallenge) {
    return { status: false, msg: "not found challenge" };
  }
  const challenge = await Challenge.findById(currChallenge.challengeId);
  if (!challenge) {
    return { status: false, msg: "not found challenge" };
  }

  const start = new Date(currChallenge.startDate);
  const today = new Date();
  const diffDays = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  const totalDays = challenge.duration_days;
  const progress =
    currChallenge.status == "done"
      ? 100
      : Math.min(Math.round((diffDays / totalDays) * 100), 100);

  return { status: true, progress: progress, data: currChallenge.status };
}

const userChallengeService = {
  chooseChallenge,
  completedUserChallenges,
  statusInPercent,
};
export default userChallengeService;
