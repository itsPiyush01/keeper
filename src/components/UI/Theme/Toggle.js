import React from "react";
import { func, string } from "prop-types";
import DarkModeToggle from "react-dark-mode-toggle";
import { useMediaQuery } from "react-responsive";

function Toggle({ theme, themeToggler }) {
	const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
	return (
		<DarkModeToggle
			onChange={() => {
				// align-self: center
				themeToggler();
			}}
			checked={theme === "dark" ? true : false}
			size={isMobile ? 40 : 60}
		/>
	);
}
Toggle.propTypes = {
	theme: string.isRequired,
	themeToggler: func.isRequired,
};
export default Toggle;
