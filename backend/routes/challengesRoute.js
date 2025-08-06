import express from "express";
import { authMdw } from "../middleWare/authMdw.js";
import challengesService from "../services/challengesService.js";

const router = express.Router();

//create a new challenge (only admin)
router.post("/", authMdw, async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send("request is empty no challenge to create");
    }
    const result = await challengesService.createChallenge(
      req.body,
      req.user.isAdmin
    );
    if (!result.status) {
      return res.status(400).send(result.msg);
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
    if (!result.status) {
      return res.status(404).send(result.msg);
    }
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//the all challenges of all users with done status
router.get("/community", authMdw, async (req, res) => {
  try {
    const result = await challengesService.getCompletedChallenges();
    if (!result.status) {
      return res.status(404).send(result.msg);
    }
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
