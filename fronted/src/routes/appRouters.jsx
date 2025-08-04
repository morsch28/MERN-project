import { Navigate, Route, Routes } from "react-router-dom";
import Workouts from "../pages/Workouts";
import Home from "../pages/home/Home";
import WelcomePage from "../pages/WelcomePage";
import { useAuth } from "../context/auth.context";
import { useEffect } from "react";
import userServices from "../services/userServices";
import AllChallenges from "../components/challenges/AllChallenges";
import MyChallenges from "../pages/challenges/MyChallenges";

function AppRouters() {
  const { user, wasHereBefore } = useAuth();

  useEffect(() => {
    if (user) {
      userServices.refreshToken();
    }
  }, [user]);

  return (
    <Routes>
      <Route
        path="/"
        element={user || wasHereBefore ? <Home /> : <WelcomePage />}
      />
      <Route path="/" element={<WelcomePage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/workouts" element={<Workouts />} />
      <Route path="all-challenges" element={<AllChallenges />} />
      <Route path="user-challenges" element={<MyChallenges />} />
    </Routes>
  );
}

export default AppRouters;
