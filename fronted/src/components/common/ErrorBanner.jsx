function ErrorBanner({ errors }) {
  const keysArr = Object.keys(errors);
  const firstError = errors[keysArr[0]];
  return firstError ? (
    <div className="text-danger bg-danger-subtle border rounded-2 border-danger text-center error-msg">
      {firstError}
    </div>
  ) : null;
}

export default ErrorBanner;
