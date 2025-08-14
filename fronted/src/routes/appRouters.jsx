import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import WelcomePage from "../pages/WelcomePage";
import { useAuth } from "../context/auth.context";
import { useEffect } from "react";
import userServices from "../services/userServices";
import AllChallengesPage from "../pages/challenges/AllChallengesPage";
import MyChallengesPage from "../pages/challenges/MyChallengesPage";
import CommunityPage from "../pages/community/CommunityPage";
import { ROUTES } from "./routes";

function AppRouters() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      userServices.refreshToken();
    }
  }, [user]);

  return (
    <Routes>
      <Route
        path={ROUTES.WELCOME}
        element={user ? <HomePage /> : <WelcomePage />}
      />
      <Route path={ROUTES.WELCOME} element={<WelcomePage />} />
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.ALL_CHALLENGES} element={<AllChallengesPage />} />
      <Route path={ROUTES.USER_CHALLENGES} element={<MyChallengesPage />} />
      <Route path={ROUTES.COMMUNITY} element={<CommunityPage />} />
    </Routes>
  );
}

export default AppRouters;
