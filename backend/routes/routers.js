import express from "express";
import authRoute from "./authRoute.js";
import quizRoute from "./quizRoute.js";
import challengesRoute from "./challengesRoute.js";
import userChallengesRoute from "./userChallengesRoute.js";
import uploadRoute from "./uploadRoute.js";
import communityRoute from "./communityRoute.js";

const router = express.Router();

router.use("/users", authRoute);
router.use("/challenges", challengesRoute);
router.use("/user-challenges", userChallengesRoute);
router.use("/quizzes", quizRoute);
router.use("/upload", uploadRoute);
router.use("/community", communityRoute);

export default router;
