import { useEffect, useState } from "react";
import communityService from "../../services/communityService";
import CompletedChallenges from "../../components/community/CompletedChallenges";
import feedbackService from "../../services/feedbackService";
import { getCommunityChallenge } from "../../utils/getCommunityChallenge";

function CommunityPage() {
  const [completedChallenges, setCompletedChallenges] = useState([]);

  useEffect(() => {
    const loadCompletedChallenges = async () => {
      try {
        const response = await communityService.getCompletedChallenges();
        if (response) {
          setCompletedChallenges(response.data);
        } else {
          // TODO: error | warning -> no challnges at all
        }
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
        const result = await feedbackService.showConfirm({
          text: "Are you sure you want to comment on the challenge?",
        });
        if (result.isConfirmed) {
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
        }
        return response;
      } else {
        await feedbackService.showAlert({
          title: "Ops..!",
          text: `${response.message}`,
          timer: 2000,
        });
      }
    } catch (error) {
      await feedbackService.showAlert({
        title: "Ops...!",
        text: "Server error",
        timer: 2000,
      });
    }
  };
  const handleDelete = async (challengeId, commentId) => {
    try {
      const response = await communityService.deleteComment(commentId);
      if (response.status == 200) {
        const result = await feedbackService.showConfirm({
          text: "Are you sure you want delete this comment?",
        });
        if (result.isConfirmed) {
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
      } else {
        await feedbackService.showAlert({
          title: "Ops..!",
          text: response.message,
          timer: 2000,
        });
      }
      return response;
    } catch (error) {
      await feedbackService.showAlert({
        title: "Ops..!",
        text: "Server Error",
        timer: 2000,
      });
    }
  };

  const completed = completedChallenges
    .slice(0, 6)
    .map((challenge) => getCommunityChallenge(challenge));

  return (
    <CompletedChallenges
      challenges={completed}
      onAddComment={handleAddComment}
      onDeleteComment={handleDelete}
    />
  );
}

export default CommunityPage;
