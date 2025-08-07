import { useFormik } from "formik";
import Joi from "joi";
import challengesService from "../../services/challengesService";
import { useEffect, useState } from "react";

function FeedbackForm({ challengeId, setSubmit, onSuccess }) {
  const [file, setFile] = useState(null);

  const { handleSubmit, getFieldProps, resetForm } = useFormik({
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
          console.log("upload result", res);
          imageUrl = res.data.filePath;
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
        if (response.status) {
          resetForm();
          onSuccess?.();
        }
        return response;
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    if (setSubmit) {
      setSubmit(handleSubmit);
    }
  }, [setSubmit, handleSubmit]);

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex flex-column w-100 align-items-center gap-3"
    >
      <div className="d-flex flex-column w-100">
        <label className="mb-2 fs-5">How was your experience?</label>
        <input
          type="text"
          {...getFieldProps("feedback.text")}
          className="border border-dark"
          style={{ height: "150px" }}
        />
      </div>
      <div className="d-flex flex-column align-items-center w-100">
        <label
          htmlFor="image-upload"
          className="upload-label text-center d-flex flex-column"
        >
          <i className="bi bi-image fs-1"></i>Click here to upload an image
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ display: "none" }}
        />
      </div>
    </form>
  );
}

export default FeedbackForm;
