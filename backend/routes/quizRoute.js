import express from "express";
import { authMdw } from "../middleWare/authMdw.js";
import quizzesService from "../services/quizzesService.js";

const router = express.Router();

router.get("/questions", authMdw, async (req, res) => {
  try {
    const response = await quizzesService.getRandomQuestion();
    if (!response.status) {
      return res.status(400).send(response.msg);
    }
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/answer", authMdw, async (req, res) => {
  try {
    const { questionId, indexOfAnswer } = req.body;
    const response = await quizzesService.checkCorrectAnswer(
      questionId,
      indexOfAnswer
    );
    if (!response.status) {
      return res.status(400).send(response.msg);
    }
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/correct/:id", authMdw, async (req, res) => {
  try {
    const id = req.params.id;
    const response = await quizzesService.getCorrectAnswer(id);
    if (!response.status) {
      return res.status(400).send(response.msg);
    }
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
