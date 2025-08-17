import express from "express";
import { authMdw } from "../middleWare/authMdw.js";
import communityService from "../services/communityService.js";

const router = express.Router();

router.get("/", authMdw, async (req, res) => {
  try {
    const response = await communityService.getCommunityFeed();
    if (!response.status) {
      return res.status(400).send(response.data);
    }
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/comment/:id", authMdw, async (req, res) => {
  try {
    const userId = req.user?._id;
    const userChallengeId = req.params.id;
    const { text } = req.body;
    const response = await communityService.addComment(
      userChallengeId,
      userId,
      text
    );
    if (!response.status) {
      return res.status(400).send(response.msg);
    }
    return res.status(201).send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/comment/:id", authMdw, async (req, res) => {
  try {
    const commentId = req.params.id;
    const { newComment } = req.body;
    const response = await communityService.updateComment(
      commentId,
      newComment
    );
    if (!response.status) {
      return res.status(400).send(response.msg);
    }
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/comment/:id", authMdw, async (req, res) => {
  try {
    const commentId = req.params.id;
    const response = await communityService.deleteComment(commentId);
    if (!response.status) {
      return res.status(400).send(response.msg);
    }
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/like", authMdw, (req, res) => {});

export default router;
