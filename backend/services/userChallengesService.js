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
  if (completedChallenges.length === 0) {
    return { status: false, msg: "not found the completed user challenges" };
  }
  return {
    status: true,
    msg: "done loaded all user completes challenges",
    data: completedChallenges,
  };
}

function getDaysNumberOfChallenge(startDate, status, totalDays) {
  if (!startDate || status === "pending") {
    return 0;
  }
  const date = new Date(startDate);
  const startMidnight = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const now = new Date();
  const nowMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const diffMs = nowMidnight - startMidnight;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  let day = diffDays + 1;
  if (typeof totalDays === "number" && totalDays > 0) {
    day = Math.min(day, totalDays);
  }
  return Math.max(day, 0);
}

async function statusInPercent(paramsId) {
  if (!paramsId) {
    return { status: false, msg: "missing parameters" };
  }
  const currChallenge = await UserChallenge.findById(paramsId);
  if (!currChallenge) {
    return { status: false, msg: "not found challenge" };
  }
  const challenge = await Challenge.findById(currChallenge.challengeId);
  if (!challenge) {
    return { status: false, msg: "not found challenge" };
  }
  const totalDays = challenge.duration_days;
  const daysNumber = getDaysNumberOfChallenge(
    currChallenge.startDate,
    currChallenge.status,
    totalDays
  );
  const progress =
    currChallenge.status === "done"
      ? 100
      : totalDays && totalDays > 0
      ? Math.min(Math.round((daysNumber / totalDays) * 100), 100)
      : 0;

  return {
    status: true,
    progress: progress,
    data: currChallenge.status,
    daysNumber,
    totalDays,
  };
}

const userChallengeService = {
  chooseChallenge,
  completedUserChallenges,
  statusInPercent,
};
export default userChallengeService;
