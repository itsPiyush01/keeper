import * as actionTypes from "./actionTypes";
import axios from "../../axios-notes";

export const addNote = (currentNote) => {
	return { type: actionTypes.ADD_NOTE, currentNote: currentNote };
};

export const setNotes = (notes) => {
	return {
		type: actionTypes.SET_NOTES,
		notes: notes,
	};
};

export const deleteNote = (id) => {
	return {
		type: actionTypes.DELETE_NOTE,
		id: id,
	};
};

export const updateNote = (updateNote) => {
	return {
		type: actionTypes.UPDATE_NOTE,
	};
};
