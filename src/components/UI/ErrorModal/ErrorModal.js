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
						<button type="button" onClick={props.modalClosed}>
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
