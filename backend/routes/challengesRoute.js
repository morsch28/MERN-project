import express from "express";
import { authMdw } from "../middleWare/authMdw.js";
import { challengeValidation } from "../model/challenge.js";
import challengesService from "../services/challengesService.js";

const router = express.Router();

//create a new challenge (only admin)
router.post("/", authMdw, async (req, res) => {
  try {
    const { error } = challengeValidation.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const result = await challengesService.createChallenge(
      req.body,
      req.user.isAdmin
    );
    if (!result) {
      return res.status(400).send("Access denied or missing data");
    }
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//get all challenges
router.get("/", authMdw, async (req, res) => {
  try {
    const result = await challengesService.getAllChallenges();
    if (!result) {
      return res.status(404).send("Not found challenges");
    }
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//get all challenges by category only user online can see
router.get("/all/:category", authMdw, async (req, res) => {
  try {
    const result = await challengesService.getChallengesByCategory(
      req.params.category
    );
    if (!result) {
      return res.status(404).send("Can't found challenges by category");
    }
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//the all challenges of all users with done status
router.get("/community", authMdw, async (req, res) => {
  try {
    const result = await challengesService.getCompletedChallenges();
    if (!result) {
      return res.status(404).send("Not found completed challenges");
    }
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
