import React, { useState, useEffect } from "react";
import { func, string } from "prop-types";
import styled from "styled-components";
import DarkModeToggle from "react-dark-mode-toggle";
const Button = styled.button`
  background: ${({ theme }) => theme.background};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  color: ${({ theme }) => theme.text};
  border-radius: 30px;
  cursor: pointer;
  font-size:0.8rem;
  padding: 0.6rem;
  }`;

function Toggle({ theme, toggleTheme }) {
  const [isDarkMode, setIsDarkMode] = useState(() => true);
  // const localTheme = window.localStorage.getItem("theme");
  useEffect(() => {
    console.info("[isDarkMode] dark mode");
    toggleTheme();

    setIsDarkMode(() => false);
  }, []);

  useEffect(() => {
    toggleTheme();
  }, [isDarkMode]);
  return (
    <DarkModeToggle onChange={setIsDarkMode} checked={isDarkMode} size={50} />
  );
}
Toggle.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired,
};
export default Toggle;
