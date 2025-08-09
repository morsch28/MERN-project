import { useEffect, useState } from "react";
import challengesService from "../../services/challengesService";

function ChallengeProgress({ userChallengeId }) {
  const [progress, setProgress] = useState(0);
  const [days, setDays] = useState({ n: 0, total: 0 });

  useEffect(() => {
    const loadProgress = async () => {
      console.log("laodProgress");
      try {
        const response = await challengesService.getUserProgress(
          userChallengeId
        );
        console.log("progress res", response.data);
        if (response.data.status) {
          const p = Math.max(
            0,
            Math.min(100, Number(response.data.progress ?? 0))
          );
          setProgress(p);
          setDays({
            n: response.data.daysNumber ?? 0,
            total: response.data.totalDays ?? 0,
          });
        }
      } catch (error) {
        console.log("error percent status", 0);
      }
    };
    loadProgress();
  }, []);

  return (
    <div className="d-flex flex-column align-items-center w-100 py-2">
      <div className="c-progress" style={{ "--p": progress }}>
        <span>{progress}%</span>
      </div>
      <div className="c-days">
        days {days.n} of {days.total}
      </div>
    </div>
  );
}

export default ChallengeProgress;
