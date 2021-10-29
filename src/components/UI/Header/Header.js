import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";
import "./Header.css";
import Toggle from "../Theme/Toggle";
import { useDarkMode } from "../../../hooks/useDarkMode";
import { lightTheme, darkTheme } from "../../UI/Theme/Theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../..//UI/Theme/globalStyles";

function Header(props) {
  const [theme, themeToggler, mountedComponent] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  return (
    <header className="header">
      <h1 className="h1">
        <HighlightIcon />
        <Toggle theme={theme} toggleTheme={props.toggleTheme} />
        Keeper
      </h1>
    </header>
  );
}

export default Header;
