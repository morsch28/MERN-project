import express from "express";
import { authMdw } from "../middleWare/authMdw.js";
import quizzesService from "../services/quizzesService.js";

const router = express.Router();

router.get("/", authMdw, async (req, res) => {
  try {
    const response = await quizzesService.getAllQuestions();
    if (!response.status) {
      return res.status(400).send(response.msg);
    }
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", authMdw, async (req, res) => {
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
