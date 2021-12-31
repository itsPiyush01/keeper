import React, { useEffect } from "react";
import Note from "./Note/Note";
import CreateArea from "../CreateArea/CreateArea";
import axios from "../../axios-notes";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

// import ErrorModal from "../../hoc/withErrorHandler/";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
// import Interceptor from "./Services/ServiceBase.interceptor";
// const store = createStore(modalReducer);
// Interceptor.interceptor(store);

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
*/

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
		props.onAddNote(note, props.token, props.userId);
	};

	const removeNoteHandler = (noteId) => {
		props.onDeleteNote(noteId, props.token);
	};

	useEffect(() => {
		props.onSetNotes(props.token, props.userId);
	}, []);

	return (
		<div>
			{/* {props.error && (
				<ErrorModal
					onClose={() => {
						props.onClear();
					}}
				>
					{props.error}
				</ErrorModal>
			)} */}
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
		loading: state.notes.loading,
		error: state.notes.error,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onSetNotes: (token, userId) => dispatch(actions.setNotes(token, userId)),

		onAddNote: (currentNote, token, userId) =>
			dispatch(actions.addNote(currentNote, token, userId)),

		onDeleteNote: (id, token) => dispatch(actions.deleteNote(id, token)),

		onClear: () => dispatch(actions.httpClear()),
	};
};

// export default connect(mapStateToProps, mapDispatchToProps)(Notes);
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Notes, axios));
