import { User, loginValidation, userValidation } from "../model/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

function createToken(userData) {
  const token = jwt.sign(
    {
      _id: userData._id,
      isBusiness: userData.isBusiness,
      isAdmin: userData.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  return token;
}

async function login(user) {
  const { error } = loginValidation.validate(user);
  if (error) {
    return { status: false, msg: "invalid data" };
  }

  const userData = await User.findOne({ email: user.email });
  if (!userData) {
    return { status: false, msg: "not found user with this email" };
  }

  const isValidPassword = await bcrypt.compare(
    user.password,
    userData.password
  );

  if (!isValidPassword) {
    return { status: false, msg: "invalid password" };
  }
  const token = createToken(userData);
  return { status: true, msg: "login successfully return token", data: token };
}

async function createUser(user) {
  const { error } = userValidation.validate(user);
  if (error) {
    return { status: false, msg: "invalid data" };
  }

  const isUserExist = await User.findOne({ email: user.email });
  if (isUserExist) {
    return { status: false, msg: "user already exist can't create this user" };
  }

  const newUser = await new User({
    ...user,
    password: await bcrypt.hash(user.password, 14),
  }).save();

  const token = createToken(newUser);
  return {
    status: true,
    msg: "create user successfully return token",
    data: token,
  };
}

async function getAllUsers() {
  const allUser = await User.find();
  if (!allUser) {
    return { status: false, msg: "can't found all users" };
  }
  return { status: true, msg: "return all users successfully", data: allUser };
}

async function getUserById(userId) {
  const userData = await User.findById(userId);
  if (!userData) {
    return { status: false, msg: "not found user by id" };
  }
  return {
    status: true,
    msg: "the current user with id return successfully",
    data: userData,
  };
}

async function updateUser(user, userId) {
  const { error, value } = userValidation.validate(user);
  if (error) {
    return { status: false, msg: "data is not valid" };
  }
  const userToUpdate = await User.findByIdAndUpdate(userId, value, {
    new: true,
  });

  if (!userToUpdate) {
    return { status: false, msg: "not found user to update" };
  }
  return { status: true, msg: "user updated successfully", data: userToUpdate };
}

async function deleteUser(userId) {
  const userToDelete = await User.findByIdAndDelete(userId);
  if (!userToDelete) {
    return {
      status: false,
      msg: "not found user to delete",
      data: userToDelete,
    };
  }
  return { status: true, msg: "user deleted successfully", data: userToDelete };
}

const authService = {
  login,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};

export default authService;
