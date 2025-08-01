import { Navigate, Route, Routes } from "react-router-dom";
import Workouts from "../pages/Workouts";
import Home from "../pages/home/Home";
import WelcomePage from "../pages/WelcomePage";
import { useAuth } from "../context/auth.context";
import AllChallenges from "../pages/AllChallenges";
import { useEffect } from "react";
import userServices from "../services/userServices";

function AppRouters() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      userServices.refreshToken();
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <WelcomePage />} />
      <Route path="/" element={<WelcomePage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/workouts" element={<Workouts />} />
      <Route path="all-challenges" element={<AllChallenges />} />
    </Routes>
  );
}

export default AppRouters;
