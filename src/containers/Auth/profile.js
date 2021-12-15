import React from "react";
import { withRouter } from "react-router-dom"; // allow us to turn component with access to the routes

const Profile = () => {
	return (
		<div style={{ color: "red" }}>
			If you see this , it means your are authenticated{" "}
		</div>
	);
};

export default withRouter(Profile);
