import { Link } from "react-router";

function NavbarLeftSide() {
  return (
    <div className="collapse navbar-collapse" id="navbarsExample04">
      <ul className="navbar-nav me-auto mb-2 mb-md-0 gap-2">
        <li className="nav-item">
          <Link className="nav-link active" to="/home">
            Home
          </Link>
        </li>
        <li className="nav-item dropdown">
          <Link
            className="nav-link active dropdown-toggle"
            aria-disabled="true"
            to="/workouts"
            id="navbarDropDownMenuLink"
          >
            Workouts
          </Link>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item">Articles</Link>
            </li>
            <li>
              <Link className="dropdown-item">Training-Program</Link>
            </li>
          </ul>
        </li>
        <li className="nav-item text-nowrap">
          <Link className="nav-link active" to="/by-category">
            All Challenges
          </Link>
        </li>
        <form role="search" className="d-flex mx-5">
          <input
            className="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
      </ul>
    </div>
  );
}

export default NavbarLeftSide;
