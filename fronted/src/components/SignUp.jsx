import { useFormik } from "formik";
import Input from "./common/Input";
import Joi from "joi";
import { normalizeUser } from "../user/normalizeUser";
import { useNavigate } from "react-router";
import { useAuth } from "../context/auth.context";
import feedbackService from "../services/feedbackService";
import { useState } from "react";
import challengeService from "../services/challengesService";
import { ROUTES } from "../routes/routes";

function SignUp() {
  const navigate = useNavigate();
  const { createUser } = useAuth();
  const [file, setFile] = useState();

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
        first: Joi.string().min(2).max(256).required(),
        last: Joi.string().min(2).max(256).required(),
        email: Joi.string().min(5).max(256).email({ tlds: false }).required(),
        password: Joi.string()
          .min(8)
          .max(50)
          .required()
          .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*(\d))(?=.*[!@#$%^&*-])/),
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
      const btn = document.querySelector(".register-btn");

      try {
        btn.style.pointerEvents = "none";
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
          } else {
            console.log("error can't upload image");
          }
        }

        const user = normalizeUser({ ...values, url: imageUrl, alt: imageAlt });
        const response = await createUser(user);
        if (response.status) {
          await feedbackService.showAlert({
            title: "Done!",
            text: "User created successfully",
            icon: "success",
            timer: 2000,
          });
          navigate(ROUTES.HOME);
        } else {
          await feedbackService.showAlert({
            title: "Ops..!",
            text: "Something is wrong can't create user",
            icon: "error",
            timer: 2000,
          });
        }
      } catch (error) {
        console.log(error?.response);
        const msg = error.response?.data;
        await feedbackService.showAlert({
          title: "Ops..!",
          text: msg || "you have server error",
          icon: "error",
          timer: 2000,
        });
      } finally {
        btn.style.pointerEvents = "auto";
      }
    },
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex flex-column justify-content-center align-items-center gap-3"
    >
      <div className="d-flex">
        <Input
          className="welcome-input"
          placeholder="First Name"
          {...getFieldProps("first")}
          error={touched.first && errors.first}
        />
        <Input
          className="welcome-input"
          placeholder="Last Name"
          {...getFieldProps("last")}
          error={touched.last && errors.last}
        />
      </div>
      <div className="d-flex">
        <Input
          className="welcome-input"
          placeholder="Email"
          {...getFieldProps("email")}
          error={touched.email && errors.email}
        />
        <Input
          className="welcome-input"
          placeholder="Password"
          {...getFieldProps("password")}
          error={touched.password && errors.password}
        />
      </div>
      <div className="d-flex w-75">
        <input
          type="file"
          accept="image/*"
          className="form-control border border-black border-1"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt="preview"
            style={{
              width: "60px",
              height: "60px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        )}
      </div>
      <button
        type="submit"
        className="btn btn-primary register-btn p-1 fs-5 mb-2  w-50"
        disabled={!isValid}
      >
        Let's Start
      </button>
    </form>
  );
}

export default SignUp;
