import feedbackService from "./feedbackService";

export const successMsg = (text) => {
  return feedbackService.showAlert({
    title: "Done!",
    text,
    icon: "success",
    timer: 2000,
  });
};

export const errorMsg = (text) => {
  return feedbackService.showAlert({
    title: "Error!",
    text,
    icon: "error",
  });
};
