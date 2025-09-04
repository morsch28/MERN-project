import ErrorBanner from "./common/ErrorBanner";
import Input from "./common/Input";

function SignUpForm({
  handleSubmit,
  errors,
  touched,
  isValid,
  getFieldProps,
  file,
  setFile,
  isBusy,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex flex-column justify-content-center align-items-center form-container"
    >
      <ErrorBanner errors={errors} />
      <Input
        className="welcome-input"
        placeholder="First Name"
        {...getFieldProps("first")}
        showError={false}
        error={touched.first && errors.first}
      />
      <Input
        className="welcome-input"
        placeholder="Last Name"
        {...getFieldProps("last")}
        showError={false}
        error={touched.last && errors.last}
      />
      <Input
        className="welcome-input"
        placeholder="Email"
        {...getFieldProps("email")}
        showError={false}
        error={touched.email && errors.email}
      />
      <Input
        className="welcome-input"
        type="password"
        placeholder="Password"
        {...getFieldProps("password")}
        showError={false}
        error={touched.password && errors.password}
      />

      <div className="d-flex">
        <input
          type="file"
          accept="image/*"
          className="rounded-2 border border-black border-1 input-image text-truncate"
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
        className="fs-5 btn btn-primary w-50 register-btn"
        disabled={!isValid}
      >
        {isBusy ? "Create User..." : "Let's Start"}
      </button>
    </form>
  );
}

export default SignUpForm;
