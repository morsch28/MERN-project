import express from "express";
import { authMdw } from "../middleWare/authMdw.js";
import userChallengeService from "../services/userChallengesService.js";
import userChallengesActionsService from "../services/userChallengesActionsService.js";

const router = express.Router();

// all user's completed challenges
router.get("/done/:id", authMdw, async (req, res) => {
  try {
    if (!req.user.isAdmin && req.user._id != req.params.id) {
      return res.status(401).send("Access denied");
    }
    const result = await userChallengeService.completedUserChallenges(
      req.params.id
    );
    if (!result.status) {
      return res.status(404).send(result.msg);
    }
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//the all user selected challenges
router.get("/:id", authMdw, async (req, res) => {
  try {
    const result = await userChallengesActionsService.getUserChallenges(
      req.params.id
    );

    if (!result.status) {
      return res.status(404).send(result.msg);
    }
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//update user personal challenge(status,feedback,image)
router.put("/:id", authMdw, async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send("empty request no challenge to update");
    }
    const result = await userChallengesActionsService.updateUserChallenge(
      req.params.id,
      req.body,
      req.user._id
    );
    if (!result.status) {
      return res.status(404).send(result.msg);
    }
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//delete user personal challenge
router.delete("/:id", authMdw, async (req, res) => {
  try {
    const result = await userChallengesActionsService.deleteUserChallenge(
      req.params.id,
      req.user._id
    );
    if (!result.status) {
      return res.status(404).send(result.msg);
    }
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

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
    if (!result.status) {
      return res.status(400).send(result.msg);
    }
    res.status(200).send(result.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
