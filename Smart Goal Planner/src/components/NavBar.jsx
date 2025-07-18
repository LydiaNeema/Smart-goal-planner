import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav>
      <NavLink
        to="/"
        className="nav-link"
      >
        DashBoard
      </NavLink>
      <NavLink
        to="/deposits"
        className="nav-link"
      >
        Deposits
      </NavLink>
      <NavLink
        to="/goals"
        className="nav-link"
      >
        Goal
      </NavLink>
    </nav>
  );
};

export default NavBar;