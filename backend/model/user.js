import mongoose from "mongoose";
import Joi from "joi";
import _ from "lodash";

const userSchema = new mongoose.Schema({
  name: {
    first: {
      type: String,
      minlength: 2,
      maxlength: 256,
      required: true,
    },
    last: {
      type: String,
      minlength: 2,
      maxlength: 256,
      required: true,
    },
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 256,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 72,
    required: true,
  },
  image: {
    url: {
      type: String,
      default: "",
    },
    alt: {
      type: String,
      default: "",
    },
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema, "users");

const validation = {
  name: Joi.object({
    first: Joi.string().min(2).max(256).required(),
    last: Joi.string().min(2).max(256).required(),
  }).required(),
  email: Joi.string()
    .min(5)
    .max(256)
    .email({ tlds: true })
    .regex(/^\S+@\S+\.\S+$/)
    .required(),
  password: Joi.string().min(8).max(50).required(),
  image: Joi.object({
    url: Joi.string().min(14).optional().allow(""),
    alt: Joi.string().min(2).max(256).optional().allow(""),
  }).required(),
};

const userValidation = Joi.object(validation);
const loginValidation = Joi.object(_.pick(validation, ["email", "password"]));

export { User, userValidation, loginValidation };
