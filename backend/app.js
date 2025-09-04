import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(
    __dirname,
    process.env.NODE_ENV == "production"
      ? ".env.production"
      : ".env.development"
  ),
});
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
app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500",
      "http://localhost:5500",
      "http://localhost:5173",
      "http://localhost:5174",
      "https://healty-challenges.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    preflightContinue: false,
  })
);
app.use(morgan(`:custom-date :method :full-url :status :response-time ms`));
app.use(
  morgan(":custom-error", {
    skip: (req, res) => res.statusCode < 400,
    stream: errorLoggerFile,
  })
);

const uploadsStaticDir = path.join(process.cwd(), "uploads");
app.use("/uploads", express.static(uploadsStaticDir));

app.use(routers);

app.get("/", (req, res) => {
  res.send("Welcome to my API ✨");
});

app.get("/healthy-lifestyle", (req, res) => {
  res.send("Healthy lifestyle");
});

const PORT = process.env.PORT;
const URI = process.env.MONGO_URI;

mongoose
  .connect(URI)
  .then(async () => {
    console.log("Connected to DB");
    await initialChallenges();
    await initialQuizzes();
    await initialUsers();
    app.listen(PORT, "0.0.0.0", () => console.log(`listening on port ${PORT}`));
  })
  .catch((err) => console.log(err));
