import express from "express";
import { User, loginValidation, userValidation } from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authMdw } from "../middleWare/authMdw.js";

const router = express.Router();

//login
router.post("/sign-in", async (req, res) => {
  try {
    const { error } = loginValidation.validate(req.body);
    if (error) {
      return res.status(400).send(error.message);
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("Invalid Email or Password");
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isValidPassword) {
      return res.status(400).send("Invalid Password");
    }
    const token = jwt.sign(
      {
        _id: user._id,
        isBusiness: user.isBusiness,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json(token);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//create-user
router.post("/", async (req, res) => {
  try {
    const { error } = userValidation.validate(req.body);
    if (error) {
      return res.status(400).send(error.message);
    }

    const user = await new User({
      ...req.body,
      password: await bcrypt.hash(req.body.password, 14),
    }).save();

    res.status(201).send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//get all users
router.get("/", async (req, res) => {
  try {
    const allUser = await User.find();
    if (!allUser) {
      return res.status(404).send("Not found users");
    }
    res.send(allUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// get user by id
router.get("/:id", authMdw, async (req, res) => {
  try {
    if (!req.user.isAdmin && req.user._id != req.params.id) {
      return res.status(401).send("Access denied");
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("Not found user");
    }
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", authMdw, async (req, res) => {
  try {
    if (!req.user.isAdmin && req.user._id !== req.params.id) {
      return res.status(401).send("Access denied");
    }

    const { error, value } = userValidation.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const userToUpdate = await User.findByIdAndUpdate(req.params.id, value, {
      new: true,
    });
    console.log(userToUpdate);
    if (!userToUpdate) {
      return res.status(404).send("Not found");
    }
    res.send(userToUpdate);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:id", authMdw, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(401).send("Access denied");
    }
    const userToDelete = await User.findByIdAndDelete(req.params.id);
    if (!userToDelete) {
      return res.status(404).send("Not Found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/sign-out", authMdw, (req, res) => {
  res.send("User signed out successfully");
});

export default router;
