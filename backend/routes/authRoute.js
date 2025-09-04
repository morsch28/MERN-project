import express from "express";
import { authMdw } from "../middleWare/authMdw.js";
import authService from "../services/authServices.js";

const router = express.Router();

//login
router.post("/sign-in", async (req, res) => {
  try {
    if (!req.body?.email || !req.body?.password) {
      return res.status(400).send("missing email or password");
    }
    const response = await authService.login(req.body);
    if (!response.status) {
      return res.status(400).send(response.msg);
    }
    return res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//create-user
router.post("/", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send("empty data");
    }
    const response = await authService.createUser(req.body);
    if (!response.status) {
      return res.status(400).send(response.msg);
    }
    return res.status(201).send(response.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//get all users
router.get("/", async (req, res) => {
  try {
    const response = await authService.getAllUsers();
    if (!response.status) {
      return res.status(404).send(response.msg);
    }
    return res.status(200).send(response.data);
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
    const response = await authService.getUserById(req.params.id);
    if (!response.status) {
      return res.status(400).send(response.msg);
    }
    return res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/:id", authMdw, async (req, res) => {
  try {
    if (!req.user.isAdmin && req.user._id !== req.params.id) {
      return res.status(401).send("Access denied");
    }
    const response = await authService.updateUser(req.body, req.params.id);
    if (!response.status) {
      return res.status(400).send(response.msg);
    }
    return res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:id", authMdw, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(401).send("Access denied");
    }
    const response = await authService.deleteUser(req.params.id);
    if (!response.status) {
      return res.status(404).send(response.msg);
    }
    return res.status(200).send(response.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/sign-out", authMdw, (req, res) => {
  res.send("User signed out successfully");
});

export default router;
