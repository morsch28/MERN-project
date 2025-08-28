import { useFormik } from "formik";
import Joi from "joi";
import challengeService from "../../services/challengesService";
import Input from "../../components/common/Input";
import { useLocation, useNavigate, useParams } from "react-router";
import { ROUTES } from "../../routes/routes";

function ChallengeForm({ challenge }) {
  const location = useLocation();
  const ch = challenge || location.state?.challenge;
  const navigate = useNavigate();

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
        const response = ch
          ? await challengeService.updateChallenge(ch._id, payload)
          : await challengeService.createChallenge(payload);
        if (response.status == 200 || response.status == 201) {
          navigate(ROUTES.ALL_CHALLENGES);
        }
        return response;
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <form
      onSubmit={handleSubmit}
      className="container my-5 border border-1 border-black d-flex flex-column align-items-center bg-white rounded-3 w-75"
    >
      <h2 className="mt-4">{ch ? "Update Challenge" : "Create Challenge"}</h2>
      <div className="d-flex gap-3 text-center my-3">
        <div className="mb-2">
          <label className="form-label">Category</label>
          <select className="form-select" {...getFieldProps("category")}>
            <option value="">Select Category</option>
            <option value="fitness">fitness</option>
            <option value="mental">mental</option>
            <option value="nutrition">nutrition</option>
          </select>
          {errors.category}
        </div>
        <div className="mb-2">
          <label className="form-label">Difficulty</label>
          <select className="form-select" {...getFieldProps("difficulty")}>
            <option value="">Select Difficulty</option>
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
          {errors.difficulty}
        </div>
      </div>
      <div className="d-flex flex-column gap-2">
        <Input
          placeholder="Challenge Title"
          {...getFieldProps("title")}
          error={touched.title && errors.title}
        />
        <Input
          placeholder="Challenge Description"
          {...getFieldProps("description")}
          error={touched.description && errors.description}
        />
        <Input
          placeholder="Duration Days"
          type="number"
          {...getFieldProps("duration_days")}
          error={touched.duration_days && errors.duration_days}
        />
        <Input
          placeholder="Benefits"
          {...getFieldProps("benefitsInput")}
          error={touched.benefitsInput && errors.benefitsInput}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary my-3 fs-5"
        disabled={!isValid}
      >
        {ch ? "Save Changes" : "Create Challenge"}
      </button>
    </form>
  );
}

export default ChallengeForm;
