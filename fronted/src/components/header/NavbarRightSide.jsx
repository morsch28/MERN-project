import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/auth.context";
import feedbackService from "../../services/feedbackService";
import WelcomePage from "../../pages/welcome/WelcomePage";
import { ROUTES } from "../../routes/routes";

function NavbarRightSide() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <WelcomePage />;
  }

  const DEFAULT_IMAGE = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const raw = user?.image?.url;
  const IMG_SRC = raw
    ? raw.startsWith("http")
      ? raw
      : `${import.meta.env.VITE_API_URL}${raw}`
    : `${DEFAULT_IMAGE}`;

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
    navigate(ROUTES.HOME);
  };

  return (
    <div className="dropdown">
      <img
        src={IMG_SRC}
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
            <Link className="dropdown-item text-primary" to={ROUTES.USER_INFO}>
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
            <Link className="dropdown-item text-primary" to={ROUTES.SIGN_IN}>
              Login
            </Link>
          </li>
        )}
      </ul>
    </div>
    // </div>
  );
}

export default NavbarRightSide;
