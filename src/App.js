import React, { useState } from "react";
import Header from "./components/UI/Header/Header";
import Notes from "./components/Notes/Notes";
// import createDate from "../utility/dateFormatter";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/UI/Theme/globalStyles";
import Toggle from "./components/UI/Theme/Toggle";
import { lightTheme, darkTheme } from "./components/UI/Theme/Theme";
import { useDarkMode } from "./hooks/useDarkMode";
function App() {
  const [theme, themeToggler, mountedComponent] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;
  if (!mountedComponent) return <div />;
  return (
    <ThemeProvider theme={themeMode}>
      <React.Fragment>
        <Toggle theme={theme} toggleTheme={themeToggler} />
        <GlobalStyles />
        <Header />
        <Notes theme={themeMode} />
      </React.Fragment>
    </ThemeProvider>
  );
}

export default App;
