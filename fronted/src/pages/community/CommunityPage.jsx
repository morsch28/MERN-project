import { useEffect, useState } from "react";
import communityService from "../../services/communityService";
import CompletedChallengesCards from "../../components/community/CompletedChallengesCards";

function CommunityPage() {
  const [completedChallenges, setCompletedChallenges] = useState([]);

  useEffect(() => {
    const loadCompletedChallenges = async () => {
      try {
        const response = await communityService.getCompletedChallenges();
        console.log("data", response.data);
        console.log("data data", response.data.data);

        setCompletedChallenges(response.data);

        return response.data;
      } catch (error) {
        console.log(error);
      }
    };
    loadCompletedChallenges();
  }, []);

  const handleAddComment = async (challengeId, text) => {
    try {
      const response = await communityService.addCommentToChallenge(
        challengeId,
        text
      );
      if (response.data?.status) {
        const newComment = response.data.data;
        setCompletedChallenges((prev) => {
          prev.map((challenge) =>
            challenge._id == challengeId
              ? { ...challenge, comments: [...challenge.comments, newComment] }
              : challenge
          );
        });
        console.log(response);
        return response;
      }

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const completed = completedChallenges.slice(0, 6);

  return (
    <CompletedChallengesCards
      challenges={completed}
      addComment={handleAddComment}
    />
  );
}

export default CommunityPage;
