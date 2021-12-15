// note reducer

import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utility/Utility";

const initialState = {
	userNotes: [],
};

const setNotes = (state, action) => {
	return updateObject(state, { userNotes: action.notes });
};

const addNote = (state, action) => {
	const addNote = [action.currentNote].concat(state.userNotes);
	return updateObject(state, { userNotes: addNote });
};

const deleteNote = (state, action) => {
	const notes_after_deletion = state.userNotes.filter(
		(note) => note.id !== action.id
	);
	return updateObject(state, { userNotes: notes_after_deletion });
};

const noteReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_NOTES:
			return setNotes(state, action);
		case actionTypes.ADD_NOTE:
			return addNote(state, action);
		case actionTypes.DELETE_NOTE:
			return deleteNote(state, action);
		case actionTypes.UPDATE_NOTE: //TODO: add update note feature
			return state;
		default:
			return state;
	}
};

export default noteReducer;

/*

const [userNotes, dispatch] = useReducer(noteReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
  });

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
