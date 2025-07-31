import express from "express";
import { authMdw } from "../middleWare/authMdw.js";

const router = express.Router();

router.get("/questions", authMdw, async (req, res) => {});

export default router;
