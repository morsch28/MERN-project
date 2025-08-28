import { useFormik } from "formik";
import Joi from "joi";
import challengeService from "../../services/challengesService";
import { useLocation, useNavigate, useParams } from "react-router";
import { ROUTES } from "../../routes/routes";
import ChallengeFormView from "./ChallengeFormView";
import userChallengeFeedback from "../../services/userChallengeFeedback";

function ChallengeForm({ challenge }) {
  const location = useLocation();
  const ch = challenge || location.state?.challenge;
  const navigate = useNavigate();
  const { created, updated, serverError, confirmUpdate } =
    userChallengeFeedback();

  const { handleSubmit, errors, touched, isValid, getFieldProps } = useFormik({
    enableReinitialize: true,
    initialValues: {
      category: ch?.category || "",
      difficulty: ch?.difficulty || "",
      title: ch?.title || "",
      description: ch?.description || "",
      duration_days: ch?.duration_days || 1,
      benefitsInput: String(ch?.benefits ?? ""),
    },
    validate(values) {
      const schema = Joi.object({
        category: Joi.string()
          .valid("fitness", "nutrition", "mental")
          .required()
          .messages({
            "any.required": "Category is required",
            "any.only": "Invalid category",
            "string.empty": "Category is required",
          }),
        difficulty: Joi.string()
          .valid("easy", "medium", "hard")
          .required()
          .messages({
            "any.required": "Difficulty is required",
            "any.only": "Invalid difficulty",
            "string.empty": "Difficulty is required",
          }),
        title: Joi.string().min(2).max(256).required().messages({
          "string.empty": "Title is required",
          "string.min": "Title is too short",
          "string.max": "Title is too long",
        }),
        description: Joi.string().min(2).max(1024).required().messages({
          "string.empty": "Description is required",
          "string.min": "Description is too short",
          "string.max": "Description is too long",
        }),
        duration_days: Joi.number().min(1).required().messages({
          "number.base": "Duration must be a number",
          "number.min": "Duration must be at least 1 day",
          "any.required": "Duration is required",
        }),
        benefitsInput: Joi.string().allow("").max(1024).messages({
          "string.max": "Benefits text is too long",
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
      const payload = {
        category: values.category,
        difficulty: values.difficulty,
        title: values.title,
        description: values.description,
        duration_days: values.duration_days,
        benefits: (values.benefitsInput || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };
      try {
        if (ch) {
          const result = await confirmUpdate();
          if (result.isConfirmed) {
            const response = await challengeService.updateChallenge(
              ch._id,
              payload
            );
            if (response.status == 200) {
              await updated();
            }
          }
        } else {
          const response = await challengeService.createChallenge(payload);
          if (response.status == 201) {
            await created();
          }
        }
        navigate(ROUTES.ALL_CHALLENGES);
      } catch (error) {
        console.log(error);
        await serverError(error?.response?.data);
      }
    },
  });
  return (
    <ChallengeFormView
      ch={ch}
      getFieldProps={getFieldProps}
      handleSubmit={handleSubmit}
      errors={errors}
      touched={touched}
      isValid={isValid}
    />
  );
}

export default ChallengeForm;
