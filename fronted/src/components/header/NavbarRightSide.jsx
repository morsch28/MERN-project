import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/auth.context";
import feedbackService from "../../services/feedbackService";
import { useEffect } from "react";
import WelcomePage from "../../pages/WelcomePage";

function NavbarRightSide() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <WelcomePage />;
  }

  const DEFAULT_IMAGE =
    "https://cdn-icons-png.flaticon.com/512/2922/2922510.png";

  const USER_IMAGE = `http://localhost:3000${user.image.url}`;

  const handleLogout = async () => {
    const result = await feedbackService.showConfirm({
      text: "Are you sure you want to logout?",
    });
    if (!result.isConfirmed) {
      return;
    } else {
      await feedbackService.showAlert({
        title: "Ok!",
        text: "See you later friend",
        icon: "success",
        timer: 2000,
      });
    }
    logout();
    navigate("/home");
  };

  return (
    <div className="collapse navbar-collapse">
      <div className="dropdown">
        <img
          src={USER_IMAGE ? USER_IMAGE : DEFAULT_IMAGE}
          className="rounded-circle bg-primary"
          width="65"
          height="65"
          role="button"
          id="userDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ cursor: "pointer", objectFit: "cover" }}
        />
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="userDropdown"
          data-bs-auto-close="true"
        >
          {user ? (
            <li className=" fs-5 d-flex flex-column fw-bold">
              <Link className="dropdown-item text-primary" to="/user-info">
                User Info
              </Link>
              <button
                className="dropdown-item text-danger d-flex gap-2"
                onClick={handleLogout}
              >
                Logout
                <i className="bi bi-box-arrow-right"></i>
              </button>
            </li>
          ) : (
            <li>
              <Link className="dropdown-item text-primary" to="/sign-in">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default NavbarRightSide;
