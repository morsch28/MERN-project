import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/auth.context";

function NavbarRightSide() {
  const navigate = useNavigate();

  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/home");
  };
  return (
    <div className="collapse navbar-collapse">
      <div className="dropdown">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
          className="rounded-circle bg-primary"
          width="50"
          height="50"
          role="button"
          id="userDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ cursor: "pointer" }}
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
