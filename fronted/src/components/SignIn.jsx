import { useFormik } from "formik";
import Input from "./common/Input";
import Joi from "joi";
import { useNavigate } from "react-router";
import { useAuth } from "../context/auth.context";
import feedbackService from "../services/feedbackService";
import { ROUTES } from "../routes/routes";
import { Link } from "react-router-dom";
import { useState } from "react";
import ErrorBanner from "./common/ErrorBanner";

function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const { handleSubmit, errors, touched, isValid, getFieldProps } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate(values) {
      const schema = Joi.object({
        email: Joi.string()
          .min(5)
          .max(256)
          .email({ tlds: false })
          .required()
          .messages({
            "string.email": "Invalid email",
            "string.empty": "Email is required",
          }),
        password: Joi.string()
          .min(8)
          .max(50)
          .required()
          .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*(\d))(?=.*[^a-zA-Z0-9])/)
          .messages({
            "string.empty": "Password is required",
            "any.required": "Password is required",
            "string.min": "At least 8 chars",
            "string.pattern.base":
              "at least 8 chars upper/lower, digit, symbol",
          }),
      });

      const { error } = schema.validate(values, { abortEarly: false });
      if (!error) {
        return null;
      }
      const errors = {};
      for (const detail of error.details) {
        errors[detail.path[0]] = detail.message;
      }
      return errors;
    },
    onSubmit: async (values) => {
      const btn = document.querySelector(".sign-in");
      btn.disabled = true;
      try {
        const response = await login(values);
        if (response.status == 200) {
          await feedbackService.showAlert({
            title: "Done!",
            text: "User was logged successfully, Welcome back!",
            icon: "success",
            timer: 2000,
          });
          navigate(ROUTES.HOME);
        } else {
          await feedbackService.showAlert({
            title: "Ops ...!",
            text: "you can't logged in",
            icon: "error",
            timer: 2000,
          });
        }
      } catch (error) {
        await feedbackService.showAlert({
          title: "Ops...!",
          text: error?.response?.data || "you have server error",
          icon: "error",
          timer: 2000,
        });
      } finally {
        btn.disabled = false;
      }
    },
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex flex-column justify-content-center align-items-center form-container"
    >
      <ErrorBanner errors={errors} />
      <Input
        className="welcome-input"
        placeholder="Email"
        {...getFieldProps("email")}
        showError={false}
        error={touched.email && errors.email}
      />
      <Input
        className="welcome-input"
        placeholder="Password"
        type="password"
        {...getFieldProps("password")}
        showError={false}
        error={touched.password && errors.password}
      />

      <button
        type="submit"
        className="btn btn-primary  fs-5   w-50 sign-in"
        disabled={!isValid}
      >
        Submit
      </button>
    </form>
  );
}

export default SignIn;
