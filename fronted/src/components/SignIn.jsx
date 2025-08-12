import { useFormik } from "formik";
import Input from "./common/Input";
import Joi from "joi";
import { useNavigate } from "react-router";
import { useAuth } from "../context/auth.context";
import feedbackService from "../services/feedbackService";

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
        email: Joi.string().min(5).max(256).email({ tlds: false }).required(),
        password: Joi.string()
          .min(8)
          .max(50)
          .required()
          .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*(\d))(?=.*[!@#$%^&*-])/),
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
      try {
        const response = await login(values);
        if (response.status == 200) {
          await feedbackService.showAlert({
            title: "Done!",
            text: "User was logged successfully, Welcome back!",
            icon: "success",
            timer: 2000,
          });
          navigate("/home");
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
      }
    },
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex flex-column justify-content-center align-items-center gap-4 signInForm"
    >
      <Input
        placeholder="Email"
        {...getFieldProps("email")}
        error={touched.email && errors.email}
      />
      <Input
        placeholder="Password"
        {...getFieldProps("password")}
        error={touched.password && errors.password}
      />

      <button
        type="submit"
        className="btn btn-primary p-2 fs-5 mb-3"
        disabled={!isValid}
      >
        Submit
      </button>
    </form>
  );
}

export default SignIn;
