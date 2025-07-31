import { useFormik } from "formik";
import Input from "./common/Input";
import PageHeader from "./common/PageHeader";
import Joi from "joi";
import { useNavigate } from "react-router";
import { useAuth } from "../context/auth.context";

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
          console.log("Navigating to /home");
          navigate("/home");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex flex-column justify-content-center align-items-center gap-4 w-100"
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
        className="btn btn-primary w-25 p-2 fs-5 mb-3"
        disabled={!isValid}
      >
        Submit
      </button>
    </form>
  );
}

export default SignIn;
