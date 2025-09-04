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
// TODO: Move to Community Route
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

router.get("/:id", authMdw, async (req, res) => {
  const { id } = req.params;
  const result = await challengesService.getChallengeDetails(id);
  if (!result.status) {
    return res.status(400).send(result.msg);
  }
  res.status(200).send(result.data);
});

router.put("/:id", authMdw, async (req, res) => {
  const id = req.params.id;
  const admin = req.user?.isAdmin;
  const values = req.body;
  const response = await challengesService.updateChallenge(id, values, admin);
  if (!response.status) {
    return res.status(400).send(response.msg);
  }
  res.status(200).send(response.data);
});

router.delete("/:id", authMdw, async (req, res) => {
  const id = req.params.id;
  const admin = req.user?.isAdmin;
  const response = await challengesService.deleteChallenge(id, admin);
  if (!response.status) {
    return res.status(400).send(response.msg);
  }
  res.status(200).send(response.data);
});

export default router;
