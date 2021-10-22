import { NavLink } from "react-router-dom";
import s from "../Navigation/Navigation.module.css";

function Navigation() {
  return (
    <>
      <NavLink
        exact
        to="/"
        className={s.navLink}
        activeClassName={s.activeNavLink}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={s.navLink}
        activeClassName={s.activeNavLink}
      >
        Movies
      </NavLink>
    </>
  );
}

export default Navigation;
