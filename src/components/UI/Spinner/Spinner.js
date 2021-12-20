import React, { useEffect } from "react";

import classes from "./Spinner.module.css";

// const spinner = (props) => {
// 	<div className={classes.Loader}>Loading...</div>;
// };

function spinner(props) {
	// console.info("");
	console.info("loading.. .");
	return <div className={classes.Loader}>Loading...</div>;
}

export default spinner;
