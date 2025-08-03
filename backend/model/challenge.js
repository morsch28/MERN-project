import mongoose from "mongoose";
import { difficulty, categories } from "../helpers/challengesEnum.js";
import Joi from "joi";

const challengeSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: Object.values(categories), // gets all the value from categories object to array
  },
  difficulty: {
    type: String,
    enum: Object.values(difficulty),
  },
  title: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
  duration_days: {
    type: Number,
  },
  benefits: {
    type: [String],
  },
});

const Challenge = mongoose.model("Challenge", challengeSchema, "challenge");

const challengeValidation = Joi.object({
  category: Joi.string().valid("fitness", "nutrition", "mental").required(),
  difficulty: Joi.string().valid("easy", "medium", "hard").required(),
  title: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  duration_days: Joi.number().min(1).integer().required(),
  benefits: Joi.array().items(Joi.string().min(2)).required(),
});

export { Challenge, challengeValidation };
