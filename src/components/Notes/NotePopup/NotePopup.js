import React, { useState } from "react";
import usePrevious from "../../../hooks/usePrevious";
import "./NotePopup.css";

import DeleteIcon from "@material-ui/icons/Delete";
import dateFormatter from "../../../utility/dateFormatter";

import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";

function NotePopup(props) {
	const [note, setNote] = useState({
		title: props.title,
		content: props.content,
	});

	const { title, content } = props;
	const prevNote = usePrevious({ title, content });

	function handleDelete(e) {
		e.stopPropagation();
		// alert("Are you sure ");
		props.close();
		props.onDeleteNote(props.id, props.token);
	}

	const handleSubmitUpdatedNote = (e) => {
		props.close();
		e.stopPropagation();

		// if previous note title or content is not equal to the current
		// title or content then update global state and update the database
		if (prevNote.title !== note.title || prevNote.content !== note.content) {
			console.log("Update Note");
			props.onUpdateNote(props.id, note, props.token, props.userId);
		}
	};
	const handleChange = (event) => {
		const { name, value } = event.target;

		setNote((prevNote) => {
			return {
				...prevNote,
				[name]: value,
			};
		});
	};
	return (
		<React.Fragment>
			<div className="popup active-class">
				<input
					className="Title"
					name="title"
					onChange={handleChange}
					value={note.title}
					placeholder="Title"
				></input>
				<textarea
					className="Textarea"
					name="content"
					onChange={handleChange}
					value={note.content}
					placeholder="Note"
				/>
				<button className="popup_close_btn" onClick={handleSubmitUpdatedNote}>
					Close
				</button>
				<button onClick={handleDelete} className="delete__button">
					<DeleteIcon />
				</button>
				<h6 className="note__date">
					Edited: {dateFormatter(props.date_of_creation)}
				</h6>
			</div>
		</React.Fragment>
	);
}

const mapStateToProps = (state) => {
	return {
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onDeleteNote: (id, token) => dispatch(actions.deleteNote(id, token)),

		onUpdateNote: (noteId, note, token, userId) =>
			dispatch(actions.updateNote(noteId, note, token, userId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NotePopup);
