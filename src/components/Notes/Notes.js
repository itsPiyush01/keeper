import React, { useReducer, useEffect } from "react";
import Note from "./Note/Note";
import CreateArea from "../CreateArea/CreateArea";
import axios from "../../axios-notes";
import styled, { css } from "styled-components";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

/*
const noteReducer = (currentNotes, action) => {
	switch (action.type) {
		case "SET":
			return action.notes;
		case "ADD":
			return [action.note, ...currentNotes];
		case "DELETE":
			return currentNotes.filter((note) => note.id !== action.id);
		default:
			throw new Error("Should not get there");
	}
};



*/

const httpReducer = (curHttpState, action) => {
	switch (action.type) {
		case "SEND":
			return { loading: true, error: null };
		case "RESPONSE":
			return { ...curHttpState, loading: false };
		case "ERROR":
			return { loading: false, error: action.errorMessage };
		case "CLEAR":
			return { ...curHttpState, error: null };
		default:
			throw new Error("Should not be reached!");
	}
};
function Notes(props) {
	// const [userNotes, dispatch] = useReducer(noteReducer, []);
	// const [httpState, dispatchHttp] = useReducer(httpReducer, {
	// 	loading: false,
	// 	error: null,
	// });

	useEffect(() => {
		// console.log("RENDERING NOTES", userNotes);
		console.log("RENDERING NOTES", props.userNotes);
	}, [props.userNotes]);

	const addNoteHandler = (note) => {
		props.onAddNote(note);
	};

	const removeNoteHandler = (noteId) => {
		props.onDeleteNote(noteId);
	};

	useEffect(() => {
		props.onSetNote();
	}, []);

	return (
		<div>
			<CreateArea onAdd={addNoteHandler} />

			{props.userNotes.map((noteItem, index) => {
				return (
					<Note
						key={index}
						id={noteItem.id}
						title={noteItem.title}
						content={noteItem.content}
						date_of_creation={noteItem.date_of_creation}
						onDelete={removeNoteHandler}
					/>
				);
			})}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		userNotes: state.notes.userNotes,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onSetNote: () => dispatch(actions.setNotes()),
		onAddNote: (currentNote) => dispatch(actions.addNote(currentNote)),
		onDeleteNote: (id) => dispatch(actions.deleteNote(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
