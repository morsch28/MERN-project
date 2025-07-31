import express from "express";
import { authMdw } from "../middleWare/authMdw.js";
import { Challenge, challengeValidation } from "../model/challenge.js";
import {
  UserChallenge,
  userChallengeValidation,
} from "../model/userChallenge.js";
import { status } from "../helpers/challengesEnum.js";

const router = express.Router();

//information about a status of specific user -status per challenge
router.get("/progressStatus/:id", authMdw, async (req, res) => {
  try {
    if (req.user._id != req.params.id) {
      return res.status(403).send("Access denied");
    }

    const currentChallenge = await UserChallenge.findById(req.params.id);
    if (!currentChallenge) {
      return res.status(404).send("Challenge not found");
    }

    const challenge = await Challenge.findByIdAndUpdate(
      currentChallenge.challengeId
    );
    if (!challenge) {
      return res.status(404).send("Challenge not found");
    }

    const start = new Date(currentChallenge.startDate);
    const today = new Date();

    const diffDays = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    const totalDays = challenge.duration_days;

    const progress =
      currentChallenge.status == "done"
        ? 100
        : Math.min(Math.round((diffDays / totalDays) * 100), 100);

    res.send({ status: currentChallenge.status, progress: progress + "%" });
  } catch (error) {
    console.log(error);
  }
});

//create a new challenge (only admin)
router.post("/", authMdw, async (req, res) => {
  try {
    const { error } = challengeValidation.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    if (!req.user.isAdmin) {
      return res.status(401).send("Access denied");
    }

    const newChallenge = new Challenge(req.body);
    await newChallenge.save();
    res.status(201).send(newChallenge);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//router to choose new challenge
router.post("/chooseChallenge/:id", authMdw, async (req, res) => {
  try {
    const challengeId = req.params.id;
    if (!challengeId) {
      return res.status(400).send("ChallengeId required");
    }
    const challengeExist = await UserChallenge.findOne({
      userId: req.user._id,
      challengeId: challengeId,
    });
    if (challengeExist) {
      return res.status(400).send("the challenge you choose already exist");
    }
    const newUserChallenge = await new UserChallenge({
      userId: req.user._id,
      challengeId: challengeId,
      status: "pending",
    }).save();
    res.status(200).send(newUserChallenge);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//get all challenges
router.get("/", authMdw, async (req, res) => {
  try {
    const allChallenges = await Challenge.find();
    if (!allChallenges) {
      return res.status(404).send("Not Found challenge");
    }
    res.status(200).send(allChallenges);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//the all challenges that user select to do
router.get("/:id", authMdw, async (req, res) => {
  try {
    if (!req.user.isAdmin && req.user._id !== req.params.id) {
      return res.status(401).send("Access denied");
    }

    const challengesOfUser = await UserChallenge.find({
      userId: req.params.id,
    }).populate("challengeId");

    if (!challengesOfUser) {
      return res.status(404).send("Not Found");
    }

    res.send(challengesOfUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//get all challenges by category only user online can see
router.get("/category/:categoryName", authMdw, async (req, res) => {
  try {
    const challengesByCategory = await Challenge.find({
      category: req.params.categoryName,
    });

    if (!challengesByCategory) {
      return res.status(404).send("Not Found");
    }

    res.send(challengesByCategory);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//update user personal challenge(status,feedback,image)
router.put("/:id", authMdw, async (req, res) => {
  try {
    const { error } = userChallengeValidation.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const challenge = await UserChallenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).send("Not found");
    }

    if (String(challenge.userId) !== req.user._id) {
      return res.status(401).send("Access denied");
    }
    const challengeToUpdate = await UserChallenge.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send(challengeToUpdate);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//delete user personal challenge
router.delete("/:id", authMdw, async (req, res) => {
  try {
    const challenge = await UserChallenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).send("Not found");
    }

    if (String(challenge.userId) != req.user._id) {
      return res.status(401).send("Access denied");
    }

    const challengeToUDelete = await UserChallenge.findByIdAndDelete(
      req.params.id
    );
    res.status(200).send(challengeToUDelete);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//the all challenges of all users with done status
router.get("/community", authMdw, async (req, res) => {
  try {
    const allDoneChallenges = await UserChallenge.find({ status: "done" });
    if (!allDoneChallenges || allDoneChallenges.length == 0) {
      return res.status(404).send("Not found");
    }
    res.status(200).send(allDoneChallenges);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//the done's challenges of specific user
router.get("/done/:id", authMdw, async (req, res) => {
  try {
    if (!req.user.isAdmin && req.user._id != req.params.id) {
      return res.status(401).send("Access denied");
    }
    const doneUserChallenges = await UserChallenge.find({
      userId: req.params.id,
      status: "done",
    });
    if (!doneUserChallenges) {
      return res.status(404).send("Access denied");
    }
    res.status(200).send(doneUserChallenges);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
