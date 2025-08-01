import express from "express";
import authRoute from "./authRoute.js";
import quizRoute from "./quizRoute.js";
import challengesRoute from "./challengesRoute.js";
import userChallengesRoute from "./userChallengesRoute.js";

const router = express.Router();

router.use("/users", authRoute);
router.use("/challenges", challengesRoute);
router.use("/challenges", userChallengesRoute);
router.use("/quizzes", quizRoute);

export default router;
