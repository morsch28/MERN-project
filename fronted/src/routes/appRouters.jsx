import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import WelcomePage from "../pages/WelcomePage";
import { useAuth } from "../context/auth.context";
import { useEffect } from "react";
import userServices from "../services/userServices";
import AllChallenges from "../pages/challenges/AllChallenges";
import MyChallenges from "../pages/challenges/MyChallenges";
import Community from "../components/community/Community";

function AppRouters() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      userServices.refreshToken();
    }
  }, [user]);

  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <WelcomePage />} />
      <Route path="/" element={<WelcomePage />} />
      <Route path="/home" element={<Home />} />
      <Route path="all-challenges" element={<AllChallenges />} />
      <Route path="user-challenges" element={<MyChallenges />} />
      <Route path="community-feed" element={<Community />} />
    </Routes>
  );
}

export default AppRouters;
