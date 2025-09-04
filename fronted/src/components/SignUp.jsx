import { useFormik } from "formik";
import Joi from "joi";
import { normalizeUser } from "../user/normalizeUser";
import { useNavigate } from "react-router";
import { useAuth } from "../context/auth.context";
import { useState } from "react";
import challengeService from "../services/challengesService";
import { ROUTES } from "../routes/routes";
import SignUpForm from "./SignUpForm";
import { errorMsg, successMsg } from "../services/userFeedbackMessage";

function SignUp() {
  const navigate = useNavigate();
  const { createUser } = useAuth();
  const [file, setFile] = useState();
  const [isBusy, setIsBusy] = useState(false);

  const { handleSubmit, errors, touched, isValid, getFieldProps } = useFormik({
    initialValues: {
      first: "",
      last: "",
      email: "",
      password: "",
      url: "",
      alt: "",
    },
    validate(values) {
      const schema = Joi.object({
        first: Joi.string().min(2).max(256).required().messages({
          "string.empty": "First name is required",
          "string.min": "First name must contain at least 2 chars",
        }),
        last: Joi.string().min(2).max(256).required().messages({
          "string.empty": "Last name is required",
          "string.min": "Last name must contain at least 2 chars",
        }),
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
              " Password must contain least 8 chars,upper/lower, digit, symbol",
          }),
        url: Joi.string().min(14).allow("").uri(),
        alt: Joi.string().allow(""),
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
      setIsBusy(true);
      try {
        let imageUrl = values.url || "";
        let imageAlt = values.alt || "";
        if (file) {
          const form = new FormData();
          form.append("image", file);
          form.append("alt", imageAlt);
          const res = await challengeService.uploadImage(form);
          if (res.status) {
            imageAlt = res.data.alt;
            imageUrl = res.data.filePath;
          }
        }

        const user = normalizeUser({ ...values, url: imageUrl, alt: imageAlt });
        const response = await createUser(user);
        if (response.status) {
          await successMsg("User created successfully");
          navigate(ROUTES.HOME);
        } else {
          await errorMsg("Something is wrong can't create user");
        }
      } catch (error) {
        setServerError(error.response.data);
        const msg = error.response?.data;
        await errorMsg(msg || "you have server error");
      } finally {
        setIsBusy(false);
      }
    },
  });

  return (
    <SignUpForm
      handleSubmit={handleSubmit}
      errors={errors}
      touched={touched}
      isValid={isValid}
      getFieldProps={getFieldProps}
      isBusy={isBusy}
      file={file}
      setFile={setFile}
    />
  );
}

export default SignUp;
