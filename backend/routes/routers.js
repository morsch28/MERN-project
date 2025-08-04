import express from "express";
import authRoute from "./authRoute.js";
import quizRoute from "./quizRoute.js";
import challengesRoute from "./challengesRoute.js";
import userChallengesRoute from "./userChallengesRoute.js";
import userChallengesActionsRoute from "./userChallengesActionsRoute.js";

const router = express.Router();

router.use("/users", authRoute);
router.use("/challenges", challengesRoute);
router.use("/user-challenges", userChallengesRoute);
router.use("/user-challenges/action", userChallengesActionsRoute);
router.use("/quizzes", quizRoute);

export default router;
