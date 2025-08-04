import express from "express";
import { authMdw } from "../middleWare/authMdw.js";
import { userChallengeValidation } from "../model/userChallenge.js";
import userChallengeService from "../services/userChallengesService.js";
import userChallengesActionSrv from "../services/userChallengesActionsSrv.js";

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
    if (!result) {
      return res.status(404).send("Not found user's completed challenges");
    }
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//the all user selected challenges
router.get("/:id", authMdw, async (req, res) => {
  try {
    if (!req.user.isAdmin && req.user._id !== req.params.id) {
      return res.status(401).send("Access denied");
    }
    const result = await userChallengesActionSrv.getUserChallenges(
      req.params.id
    );

    if (!result) {
      return res.status(404).send("Not found user's challenges");
    }
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//update user personal challenge(status,feedback,image)
router.put("/:id", authMdw, async (req, res) => {
  try {
    const { error } = userChallengeValidation.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const result = await userChallengesActionSrv.updateUserChallenge(
      req.params.id,
      req.body,
      req.user._id
    );
    if (!result) {
      return res.status(404).send("Not found challenge to update");
    }
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//delete user personal challenge
router.delete("/:id", authMdw, async (req, res) => {
  try {
    const result = await userChallengesActionSrv.deleteUserChallenge(
      req.params.id,
      req.user._id
    );
    if (!result) {
      res.status(404).send("Not found challenge to delete");
    }
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
