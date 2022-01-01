import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";
import classes from "./Header.module.css";
import Toggle from "../Theme/Toggle";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";
function Header(props) {
	return (
		<header className={classes.header}>
			<h1 className={classes.h1}>
				<HighlightIcon />
				Keeper
			</h1>
			<div className={classes.nav__div}>
				<button
					className={classes.header__btn}
					onClick={() => props.onLogout()}
				>
					Logout
				</button>
				<Toggle theme={props.theme} themeToggler={props.themeToggler} />
			</div>
		</header>
	);
}
const mapDispatchToProps = (dispatch) => {
	return {
		onLogout: () => dispatch(actions.logout()),
	};
};

export default connect(null, mapDispatchToProps)(Header);
