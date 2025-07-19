import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="nav-container">
      <div className="nav-title">Smart Goal Planner</div>
      <div className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/deposits"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Deposits
        </NavLink>
        <NavLink
          to="/goals"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Goals
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
