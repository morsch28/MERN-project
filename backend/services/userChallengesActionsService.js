import { UserChallenge } from "../model/userChallenge.js";
import { userChallengeValidation } from "../model/userChallenge.js";

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

async function getUserChallenges(idUserParam) {
  console.log("user param", idUserParam);

  if (!idUserParam) {
    return { status: false, msg: "missing parameters" };
  }
  const challengesOfUser = await UserChallenge.find({
    userId: idUserParam,
  })
    .populate("challengeId")
    .lean();

  if (!challengesOfUser) {
    return { status: false, msg: "not found user's challenges" };
  }
  const data = challengesOfUser.map((challenge) => {
    const totalDays = challenge.challengeId?.duration_days;
    const daysNumber = getDaysNumberOfChallenge(
      challenge.startDate,
      challenge.status,
      totalDays
    );
    const progress =
      challenge.status === "done"
        ? 100
        : totalDays > 0
        ? Math.min(Math.round((daysNumber / totalDays) * 100), 100)
        : 0;
    return {
      ...challenge,
      totalDays,
      daysNumber,
      progress,
    };
  });
  return {
    status: true,
    msg: "user's challenges successfully",
    data: data,
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
