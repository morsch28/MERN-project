import { useParams } from "react-router-dom";
import challengeService from "../../services/challengesService";
import { useEffect, useState } from "react";

function ChallengeDetails() {
  const { id } = useParams();
  const [detailOfChallenge, setDetailsOfChallenge] = useState(null);

  useEffect(() => {
    const loadChallengeDetails = async () => {
      try {
        const response = await challengeService.getChallengeById(id);
        console.log("ch details", response);
        setDetailsOfChallenge(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadChallengeDetails();
  }, [id]);

  if (!detailOfChallenge) {
    return <div>Loading ....</div>;
  }

  return <></>;
}

export default ChallengeDetails;
