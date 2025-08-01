import { Challenge } from "../model/challenge.js";
import { UserChallenge } from "../model/userChallenge.js";

//create challenge
async function createChallenge(values, userIsAdmin) {
  if (!values) {
    return false;
  }
  if (!userIsAdmin) {
    return false;
  }
  const newChallenge = new Challenge(values);
  await newChallenge.save();
  return newChallenge;
}

//get all challenges
async function getAllChallenges() {
  const allChallenges = await Challenge.find();
  console.log("Number of challenges in DB:", allChallenges.length);
  if (!allChallenges) {
    return false;
  }
  return allChallenges;
}

async function getChallengesByCategory(categoryName) {
  if (!categoryName) {
    return false;
  }
  const challenges = await Challenge.find({
    category: categoryName,
  });

  if (!challenges) {
    return false;
  }
  return challenges;
}

async function getCompletedChallenges() {
  const allDoneChallenges = await UserChallenge.find({ status: "done" });
  if (!allDoneChallenges || allDoneChallenges.length == 0) {
    return false;
  }
}

const challengesService = {
  createChallenge,
  getAllChallenges,
  getChallengesByCategory,
  getCompletedChallenges,
};
export default challengesService;
