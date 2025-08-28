import { useFormik } from "formik";
import Joi from "joi";
import challengesService from "../../services/challengesService";
import { useEffect, useState } from "react";
import feedbackService from "../../services/feedbackService";

function FeedbackForm({ challengeId, onSuccess, initialFeedback = {} }) {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(initialFeedback?.image?.url || "");

  useEffect(() => {
    if (initialFeedback?.image?.url) {
      setImageUrl(initialFeedback.image.url);
    }
  }, [initialFeedback]);

  const { handleSubmit, getFieldProps, resetForm } = useFormik({
    initialValues: {
      feedback: {
        text: initialFeedback?.text || "",
        image: {
          alt: initialFeedback?.alt || "",
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
        let currentImageUrl = imageUrl;

        if (file) {
          const formData = new FormData();
          formData.append("image", file);
          const res = await challengesService.uploadImage(formData);
          console.log("upload result", res);
          currentImageUrl = res.data.filePath;
        }
        const feedbackData = {
          feedback: {
            text: values.feedback.text,
            image: {
              url: currentImageUrl,
              alt: values.feedback.image.alt,
            },
          },
        };
        const response = await challengesService.updateUserChallenge(
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

  const handleSave = async (e) => {
    e.preventDefault();
    const result = await feedbackService.showConfirm({
      text: "Are you sure you want to save feedback for this challenge?",
    });
    if (result.isConfirmed) {
      handleSubmit();
    }
  };

  return (
    <form
      onSubmit={handleSave}
      className="d-flex flex-column w-100 align-items-center gap-3"
    >
      <div className="d-flex flex-column w-100">
        <label className="mb-2 fs-5">How was your experience?</label>
        <textarea
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
          {imageUrl ? (
            <img
              src={`http://localhost:3000${imageUrl}`}
              alt={initialFeedback?.image?.alt || "Uploaded feedback"}
              style={{
                maxWidth: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <>
              <i className="bi bi-image fs-1"></i>
              Click here to upload an image
            </>
          )}
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ display: "none" }}
        />
      </div>
      <div className="d-flex gap-2">
        <button
          type="button"
          className="text-danger border-danger fs-5 btn"
          onClick={onSuccess}
        >
          Cancel
        </button>
        <button type="submit" className="btn bg-black text-white fs-5">
          Save progress
        </button>
      </div>
    </form>
  );
}

export default FeedbackForm;
