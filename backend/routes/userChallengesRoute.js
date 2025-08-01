import express from "express";
import { authMdw } from "../middleWare/authMdw.js";
import { userChallengeValidation } from "../model/userChallenge.js";
import userChallengeService from "../services/userChallengesService.js";

const router = express.Router();

//router to choose new challenge
router.post("/choose-challenge/:id", authMdw, async (req, res) => {
  try {
    const challengeId = req.params.id;
    if (!challengeId) {
      return res.status(400).send("ChallengeId required");
    }
    const result = await userChallengeService.chooseChallenge(
      req.user._id,
      challengeId
    );
    if (!result) {
      return res.status(400).send("something is wrong can't choose challenge");
    }
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//user progress status in percentage
router.get("/progress-percent/:id", authMdw, async (req, res) => {
  try {
    if (req.user._id != req.params.id) {
      return res.status(403).send("Access denied");
    }
    result = await userChallengeService.statusInPercent(req.params.id);
    if (!result) {
      return res.status(404).send("Not found challenge ");
    }
    res.send({ status: result.status, progress: result + "%" });
  } catch (error) {
    console.log(error);
  }
});

export default router;
