import NavbarLeftSide from "./NavbarLeftSide";
import NavbarRightSide from "./NavbarRightSide";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar   bg-body-secondary border-bottom border-3  fs-5 "
      aria-label="Fourth navbar example"
    >
      <div className="container fs-5">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <NavbarLeftSide />
        <div className="ms-auto">
          <NavbarRightSide />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
