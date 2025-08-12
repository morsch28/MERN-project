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

router.post("/comment", authMdw, (req, res) => {});

router.put("/comment/:id", authMdw, (req, res) => {});

router.delete("/comment/:id", authMdw, (req, res) => {});

router.post("/like", authMdw, (req, res) => {});

export default router;
