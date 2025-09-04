import { UserChallenge } from "../model/userChallenge.js";
// import { Challenge } from "../model/challenge.js";

async function chooseChallenge(idOfUser, idOfChallenge) {
  if (!idOfUser || !idOfChallenge) {
    return { status: false, msg: "missing parameters" };
  }
  const challenge = await UserChallenge.findOne({
    userId: idOfUser,
    challengeId: idOfChallenge,
  });
  if (challenge) {
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

const userChallengeService = {
  chooseChallenge,
  completedUserChallenges,
};

export default userChallengeService;
