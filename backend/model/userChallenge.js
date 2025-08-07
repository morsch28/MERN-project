import mongoose from "mongoose";
import Joi from "joi";
import { status } from "../helpers/challengesEnum.js";

const userChallengeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  challengeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Challenge",
  },
  status: {
    type: String,
    enum: Object.values(status),
  },
  feedback: {
    text: String,
    image: {
      url: {
        type: String,
      },
      alt: {
        type: String,
      },
    },
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  completedDate: {
    type: Date,
  },
});

const UserChallenge = mongoose.model(
  "UserChallenge",
  userChallengeSchema,
  "userChallenge"
);

const userChallengeValidation = Joi.object({
  status: Joi.string()
    .valid("pending", "in-progress", "done")
    .default("pending"),
  feedback: Joi.object({
    text: Joi.string().max(1024).allow("").optional(),
    image: Joi.object({
      url: Joi.string().allow("").optional(),
      alt: Joi.string().min(2).max(256).allow("").optional(),
    }).optional(),
  }),
});

export { UserChallenge, userChallengeValidation };
