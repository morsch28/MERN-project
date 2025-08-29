import dotenv from "dotenv";
dotenv.config();
import express from "express";
import routers from "./routes/routers.js";
import mongoose from "mongoose";
import initialChallenges from "./helpers/InitialDataChallenges.js";
import cors from "cors";
import initialQuizzes from "./helpers/initialDataQuizzes.js";
import { morgan, errorLoggerFile } from "./middleWare/logger.js";
import initialUsers from "./helpers/initialDataUsers.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan(`:custom-date :method :full-url :status :response-time ms`));
app.use(
  morgan(":custom-error", {
    skip: (req, res) => res.statusCode < 400,
    stream: errorLoggerFile,
  })
);

app.use("/uploads", express.static("uploads"));
app.use(routers);

app.get("/", (req, res) => {
  res.send("Welcome to my API ✨");
});

app.get("/healthy-lifestyle", (req, res) => {
  res.send("Healthy lifestyle");
});

const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to DB");
    await initialChallenges();
    await initialQuizzes();
    await initialUsers();
    app.listen(PORT, "0.0.0.0", () => console.log(`listening on port ${PORT}`));
  })
  .catch((err) => console.log(err));
