import React from "react";
import { func, string } from "prop-types";
import DarkModeToggle from "react-dark-mode-toggle";

function Toggle({ theme, themeToggler }) {
	return (
		<DarkModeToggle
			onChange={() => {
				themeToggler();
			}}
			checked={theme === "dark" ? true : false}
			size={60}
		/>
	);
}
Toggle.propTypes = {
	theme: string.isRequired,
	themeToggler: func.isRequired,
};
export default Toggle;
