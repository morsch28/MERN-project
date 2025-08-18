const getCategoryClasses = (challenge) => {
  return challenge?.challengeId?.category === "nutrition"
    ? "bg-success-subtle text-success border border-success"
    : challenge?.challengeId?.category === "mental"
    ? "bg-info-subtle text-info border border-info"
    : "bg-warning-subtle text-warning border-border-warning";
};

export const getCommunityChallenge = (challenge) => {
  const firstName = challenge?.userId?.name?.first || "";
  const lastName = challenge?.userId?.name?.last || "";
  const userName = `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
  const date = new Date(challenge?.completedDate);
  const formatDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const imagePath = challenge?.userId?.image?.url || "";
  const imageUrl = imagePath ? `http://localhost:3000${imagePath}` : null;
  const category = challenge?.challengeId?.category;
  const title = challenge?.challengeId.title;
  const feedback = challenge?.feedback?.text;
  const classes = getCategoryClasses(challenge);

  const allComments = challenge?.comments?.length;
  return {
    firstName,
    userName,
    imageUrl,
    formatDate,
    allComments,
    category,
    title,
    feedback,
    classes,
  };
};
