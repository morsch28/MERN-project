import mongoose from "mongoose";
import { categories } from "../helpers/challengesEnum.js";

const quizSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: Object.values(categories),
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answers: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: Number,
    required: true,
  },
});

const Quiz = mongoose.model("Quiz", quizSchema, "quiz");

export default Quiz;
