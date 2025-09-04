import { useEffect, useState } from "react";
import TypeWriter from "../../components/TypeWriter";
import welcomePageImage from "../../images/Logo-image.png";
import SignIn from "../../components/SignIn";
import SignUp from "../../components/SignUp";
import { useAuth } from "../../context/auth.context";
import "./welcome-page.css";
import { Link } from "react-router";
import { ROUTES } from "../../routes/routes";

function WelcomePage() {
  const [signIn, setSignIn] = useState(true);
  const { isLoading } = useAuth();
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  });

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 vw-100 bg-white welcome-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="vh-100 vw-100 bg-light position-fixed top-0 start-0">
      <div className="d-flex welcome-challenges">
        <div className="welcome-left d-flex  ">
          {isMobile && (
            <img src={welcomePageImage} alt="welcome" className="welcome-bg" />
          )}
          <div className="welcome-titles">
            <h1 className="fw-bold welcome-title-1">Take on challenges.</h1>
            <h2 className="fw-bold welcome-title-2">Track your progress.</h2>
            <h3 className="fw-bold welcome-title-3">Feel Better.</h3>
          </div>
        </div>
        <div className="welcome-right d-flex   text-center  justify-content-center">
          <div className="welcome-form border border-dark  rounded-2 bg-white d-flex  flex-column justify-content-center">
            <h2>{signIn ? "Sign In" : "Sign Up"}</h2>
            {!isMobile && (
              <p>
                {signIn
                  ? "sign-in to continue your challenges journey"
                  : "create your account and change your life"}
              </p>
            )}
            {signIn ? <SignIn /> : <SignUp />}
            {signIn ? (
              <div className="btn-signing">
                New Here?
                <a
                  className="btn btn-link p-0 "
                  onClick={() => setSignIn(false)}
                >
                  Create an account
                </a>
              </div>
            ) : (
              <div className="d-flex justify-content-center btn-signing">
                Already have an account?
                <a className="btn btn-link p-0" onClick={() => setSignIn(true)}>
                  Sign in
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
