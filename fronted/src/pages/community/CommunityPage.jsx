import { useEffect, useState } from "react";
import communityService from "../../services/communityService";
import CompletedChallengesCards from "../../components/community/CompletedChallengesCards";

function CommunityPage() {
  const [completedChallenges, setCompletedChallenges] = useState([]);

  useEffect(() => {
    const loadCompletedChallenges = async () => {
      try {
        const response = await communityService.getCompletedChallenges();
        const list = response.data;

        setCompletedChallenges(list);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };
    loadCompletedChallenges();
  }, []);

  const handleAddComment = async (id, commentText) => {
    try {
      const response = await communityService.addCommentToChallenge(
        id,
        commentText
      );
      if (response.status == 201) {
        const newComment = response.data;
        setCompletedChallenges((prev) =>
          prev.map((challenge) => {
            return challenge?._id == id
              ? {
                  ...challenge,
                  comments: [...(challenge.comments || []), newComment],
                }
              : challenge;
          })
        );

        return response;
      } else {
        console.log("add comment failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (challengeId, commentId) => {
    try {
      const response = await communityService.deleteComment(commentId);
      if (response.status == 200) {
        setCompletedChallenges((prev) =>
          prev.map((challenge) => {
            return challenge._id == challengeId
              ? {
                  ...challenge,
                  comments: challenge.comments.filter(
                    (comment) => comment._id !== commentId
                  ),
                }
              : challenge;
          })
        );
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
      onAddComment={handleAddComment}
      onDeleteComment={handleDelete}
    />
  );
}

export default CommunityPage;
