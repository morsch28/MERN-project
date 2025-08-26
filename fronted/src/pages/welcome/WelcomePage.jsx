import { useState } from "react";
import TypeWriter from "../../components/TypeWriter";
import welcomePageImage from "../../images/challenges_logo.jpg";
import SignIn from "../../components/SignIn";
import SignUp from "../../components/SignUp";
import { useAuth } from "../../context/auth.context";
import "./welcome-page.css";

function WelcomePage() {
  const [singIn, setSignIn] = useState(true);
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 vw-100 bg-white">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="d-flex  align-items-center  vh-100 vw-100 bg-light position-fixed top-0 start-0  text-center gap-2 welcome-screen">
        <div className="d-flex flex-column justify-content-center align-items-center w-50 gap-4">
          <img className="mt-1 welcomeImage" src={welcomePageImage} />
          <TypeWriter
            text={`Welcome to my website - your gateway to a healthier and more balanced life.\nDiscover personalized challenges to improve your fitness, nutrition, sleep quality,\n and embed healthy habits into your daily routine.\n Join our community and start your journey toward meaningful change today.`}
          />
        </div>
        <div className="d-flex flex-column w-50 align-items-center gap-1  border-3 welcomePageToForm">
          <h1 className=" h1-welcomePage">Mor(e) Wellness & LifeStyle</h1>
          <div className="bg-dark-subtle  d-flex align-items-center justify-content-center p-2 gap-2 divStartBtn">
            <button
              className={`border-0 p-2 w-50 rounded-2 fs-4 btnOneStart ${
                singIn ? "bg-white" : "bg-dark-subtle"
              }`}
              onClick={() => {
                setSignIn(true);
              }}
            >
              Sign-In
            </button>
            <button
              className={`border-0 p-2 rounded-2 fs-4  ${
                !singIn ? "bg-white" : "bg-dark-subtle"
              }`}
              onClick={() => {
                setSignIn(false);
              }}
            >
              Get Started
            </button>
          </div>
          <div className="d-flex flex-column mt-4 align-items-center gap-4 justify-content-center text-center signIn p-3 rounded-3">
            <h2 className="fs-1">
              {singIn ? "Welcome Back!" : "Start your journey"}
            </h2>
            <p className="fs-4">
              {singIn
                ? "sign-in to continue your challenges journey"
                : "create your account and begin transforming your life"}
            </p>
            {singIn ? <SignIn /> : <SignUp />}
          </div>
        </div>
      </div>
    </>
  );
}

export default WelcomePage;
