import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import dateFormatter from "../../../utility/dateFormatter";
import "./Note.css";

function Note(props) {
	function handleClick() {
		props.onDelete(props.id);
	}

	let content = props.content;
	if (content.length > 200) {
		content = content.substr(0, 100) + " ...";
	}
	return (
		<div className="note">
			<h1>{props.title}</h1>
			<p>{content}</p>
			<button onClick={handleClick}>
				<DeleteIcon />
			</button>
			<h6 className="note__date">
				Edited: {dateFormatter(props.date_of_creation)}
			</h6>
		</div>
	);
}

export default Note;
