import { Link } from "react-router";
import { ROUTES } from "../../routes/routes";

function NavbarLeftSide() {
  return (
    <div className="collapse navbar-collapse" id="navbarsExample04">
      <ul className="navbar-nav me-auto mb-2 mb-md-0 gap-2">
        <li className="nav-item">
          <Link className="nav-link active" to={ROUTES.HOME}>
            HomePage
          </Link>
        </li>
        <li className="nav-item text-nowrap">
          <Link className="nav-link active" to={ROUTES.ALL_CHALLENGES}>
            All Challenges
          </Link>
        </li>
        <li className="nav-item text-nowrap">
          <Link className="nav-link active" to={ROUTES.USER_CHALLENGES}>
            My Challenges
          </Link>
        </li>
        <li className="nav-item text-nowrap">
          <Link className="nav-link active" to={ROUTES.COMMUNITY}>
            Community
          </Link>
        </li>
        <li className="nav-item text-nowrap">
          <Link className="nav-link active" to={ROUTES.TRIVIA}>
            Trivia
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default NavbarLeftSide;
