import { useEffect, useState } from "react";

export const useDarkMode = () => {
	const [theme, setTheme] = useState("dark");
	const [mountedComponent, setMountedComponent] = useState(false);
	const setMode = (mode) => {
		window.localStorage.setItem("theme", mode);
		setTheme(mode);
	};
	const themeToggler = () => {
		theme === "dark" ? setMode("light") : setMode("dark");
	};

	useEffect(() => {
		const localTheme = window.localStorage.getItem("theme");
		localTheme && setTheme(localTheme);
		setMountedComponent(true);
	}, []);

	return [theme, themeToggler, mountedComponent];
};

// Reference::  https://www.smashingmagazine.com/2020/04/dark-mode-react-apps-styled-components/
