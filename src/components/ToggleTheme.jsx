import { useContext } from "react";
import ThemeContext from "./ThemeContext";

function ToggleTheme() {
  const { theme, switchTheme } = useContext(ThemeContext);
  return (
    <div>
      <button
        onClick={switchTheme}
        className='themeBtn'
      >
        {theme}
      </button>
    </div>
  );
}

export default ToggleTheme;
