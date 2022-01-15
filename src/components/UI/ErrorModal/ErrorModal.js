import React from "react";

import "./ErrorModal.css";

const ErrorModal = React.memo((props) => {
	// useEffect(console.log("[componentDidMount][ErrorModal.js]"), []);

	let Component = <div></div>;

	if (props.show) {
		Component = (
			<React.Fragment>
				<div className="backdrop" onClick={props.onClose} />
				<div className="error-modal">
					<h2>An Error Occurred!</h2>
					<p>{props.children}</p>
					<div className="error-modal__actions">
						<button
							type="button"
							style={{
								textDecoration: "none",
								fontSize: "1.1rem",
								// border: "0.2rem solid transparent",
								backgroundColor: "transparent",
								color: "#f5ba13",
								border: "none",
								cursor: "pointer",
							}}
							onClick={props.modalClosed}
						>
							Okay
						</button>
					</div>
				</div>
			</React.Fragment>
		);
	}
	return Component;
});

export default ErrorModal;
