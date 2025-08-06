import { useFormik } from "formik";
import Joi from "joi";
import challengesService from "../../services/challengesService";
import { useState } from "react";

function FeedbackForm({ challengeId }) {
  const [file, setFile] = useState(null);

  const { handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      feedback: {
        text: "",
        image: {
          alt: "",
        },
      },
    },
    validate(values) {
      const schema = Joi.object({
        feedback: Joi.object({
          text: Joi.string().min(3).max(300).allow("").optional(),
          image: Joi.object({
            alt: Joi.string().min(2).max(256).allow("").optional(),
          }),
        }).optional(),
      });
      const { error } = schema.validate(values, { abortEarly: true });
      if (!error) {
        return null;
      }
      const errors = {};
      for (const detail of error.details) {
        errors[detail.path[0]] = detail.message;
      }
      return error;
    },
    onSubmit: async (values) => {
      try {
        let imageUrl = "";

        if (file) {
          const formData = new FormData();
          formData.append("image", file);
          const res = await challengesService.uploadImage(formData);
          imageUrl = res.filePath;
        }
        const feedbackData = {
          feedback: {
            text: values.feedback.text,
            image: {
              url: imageUrl,
              alt: values.feedback.image.alt,
            },
          },
        };
        const response = await challengesService.updateChallenge(
          challengeId,
          feedbackData
        );
        return response;
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <h1>Document your progress</h1>
      <div className="d-flex flex-column">
        <label>How was your experience?</label>
        <input type="text" {...getFieldProps("feedback.text")} />
      </div>
      <div className="d-flex flex-column">
        <label>Add Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <div className="d-flex">
        <button type="submit">Save Progress</button>
        <button type="button">Cancel</button>
      </div>
    </form>
  );
}

export default FeedbackForm;
