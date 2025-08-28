import Input from "../../components/common/Input";
function ChallengeFormView({
  ch,
  handleSubmit,
  errors,
  touched,
  isValid,
  getFieldProps,
}) {
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

export default ChallengeFormView;
