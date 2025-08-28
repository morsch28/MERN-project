import feedbackService from "./feedbackService";

export default function userChallengeFeedback() {
  const created = () => {
    return feedbackService.showAlert({
      title: "Ok!",
      text: "challenge created successfully",
      icon: "success",
      timer: 2000,
    });
  };
  const updated = () => {
    return feedbackService.showAlert({
      title: "Ok!",
      text: "challenge updated successfully",
      icon: "success",
      timer: 2000,
    });
  };
  const serverError = (errorText) => {
    return feedbackService.showAlert({
      title: "Ops..!",
      text: errorText || "you have server error",
      icon: "error",
      timer: 2000,
    });
  };
  const confirmUpdate = () => {
    return feedbackService.showConfirm({
      text: "Are you sure you want to update?",
    });
  };
  return { created, updated, serverError, confirmUpdate };
}
