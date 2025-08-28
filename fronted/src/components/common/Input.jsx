function Input({ error, ...rest }) {
  const isEmpty = !rest.value;
  const isValid = !!error;
  return (
    <div className="container d-flex flex-column">
      <input
        type="text"
        className={`form-control  p-3 border-2 fs-5  ${
          isValid ? "is-invalid" : ""
        }`}
        {...rest}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default Input;
