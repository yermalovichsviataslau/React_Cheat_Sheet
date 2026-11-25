import iconReact from "../assets/react.svg";
import gitHub from "../assets/github.svg";
import ToggleTheme from "./ToggleTheme";
import { NavLink } from "react-router";
function Header() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "70px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#16171d",
        padding: "0 40px",
        boxSizing: "border-box",
        zIndex: 1000,
      }}
    >
      <NavLink to="/">
        <img src={iconReact} alt="iconReact" style={{ height: 60 }} />
      </NavLink>

      <ToggleTheme />
      <a href="https://github.com/yermalovichsviataslau">
        <img src={gitHub} alt="gitHub" style={{ height: 60 }} target="_blank" rel="noreferrer"/>
      </a>
    </header>
  );
}

export default Header;
