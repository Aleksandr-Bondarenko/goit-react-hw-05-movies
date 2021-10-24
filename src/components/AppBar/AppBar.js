import Navigation from "../Navigation/Navigation";
import s from "./AppBar.module.css";

function AppBar() {
  return (
    <div className={s.AppBar}>
      <Navigation />
    </div>
  );
}

export default AppBar;
