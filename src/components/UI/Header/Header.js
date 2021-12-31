import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";
import "./Header.css";
import Toggle from "../Theme/Toggle";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";
function Header(props) {
	return (
		<header className="header">
			<h1 className="h1">
				<HighlightIcon />
				Keeper
			</h1>
			<button onClick={() => props.onLogout()}>Logout</button>
			<Toggle theme={props.theme} themeToggler={props.themeToggler} />
		</header>
	);
}
const mapDispatchToProps = (dispatch) => {
	return {
		onLogout: () => dispatch(actions.logout()),
	};
};

export default connect(null, mapDispatchToProps)(Header);
