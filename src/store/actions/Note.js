import * as actionTypes from "./actionTypes";
import axios from "../../axios-notes";

export const addNote = (currentNote) => {
	return (dispatch) => {
		dispatch(httpStart());
		// dispatchHttp({ type: "SEND" });
		// const d = createDate();
		const d = new Date();
		console.log("date" + d);

		// d.toISOString()
		let noteObject = {
			...currentNote,
			date_of_creation: "" + d,
		};

		axios
			.post("/notes.json", noteObject)
			.then((res) => {
				console.log(res);
				// dispatchHttp({ type: "RESPONSE" });
				// dispatch({
				// 	type: "ADD",
				// 	note: { id: res.data.name, ...noteObject },
				// });
				// props.onAddNote({});
				dispatch({
					type: actionTypes.ADD_NOTE,
					currentNote: {
						id: res.data.name,
						...noteObject,
					},
				});
				dispatch(httpSuccess());
			})
			.catch((err) => {
				// console.log(err);
				dispatch(httpFail(err.message));
				// dispatchHttp({ type: "ERROR" });
			});
	};
};

export const setNotes = () => {
	return (dispatch) => {
		dispatch(httpStart());
		axios
			.get("/notes.json")
			.then((response) => {
				// dispatchHttp({ type: "RESPONSE" });
				const loadedUsers = [];
				for (const key in response.data) {
					loadedUsers.push({
						id: key,
						title: response.data[key].title,
						content: response.data[key].content,
						date_of_creation: response.data[key].date_of_creation,
					});
				}
				loadedUsers.reverse();
				// console.info("helllo" + props.userNotes);
				/*useReducer*/
				// dispatch({
				// 	type: "SET",
				// 	notes: loadedUsers,
				// });
				// console.log(response.data);
				// console.info(userNotes);
				dispatch(httpSuccess());
				dispatch({
					type: actionTypes.SET_NOTES,
					notes: loadedUsers,
				});
			})
			.catch((error) => {
				console.info(error.message);
				// let msg = error.message;
				// dispatch(httpFail(error));
				dispatch(httpFail(error.message));
				// dispatchHttp({ type: "ERROR" });
			});
	};
};

export const deleteNote = (id) => {
	return (dispatch) => {
		dispatch(httpStart());
		// dispatchHttp({ type: "SEND" });
		axios
			.delete(`/notes/${id}.json`)
			.then((res) => {
				// dispatchHttp({ type: "RESPONSE" });
				// dispatch({ type: "DELETE", id: noteId });
				// props.onDeleteNote(noteId);
				dispatch({
					type: actionTypes.DELETE_NOTE,
					id: id,
				});
				dispatch(httpSuccess());
			})
			.catch((err) => {
				console.log(err);
				// dispatchHttp({ type: "ERROR" });
				dispatch(httpFail(err.message));
			});
	};
};

export const updateNote = (updateNote) => {
	return {
		type: actionTypes.UPDATE_NOTE,
	};
};

export const httpStart = () => {
	return {
		type: actionTypes.HTTP_START,
	};
};

export const httpSuccess = () => {
	return {
		type: actionTypes.HTTP_SUCCESS,
	};
};

export const httpFail = (error) => {
	return {
		type: actionTypes.HTTP_FAIL,
		error: error,
	};
};

export const httpClear = () => {
	return {
		type: actionTypes.HTTP_CLEAR,
	};
};
