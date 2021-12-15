import { tokenizer } from "acorn";
import axios from "axios";
import { localsName } from "ejs";

import * as actionTypes from "./actionTypes";

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: token,
		userId: userId,
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	};
};

export const logout = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("expirationTime");
	localStorage.removeItem("userId");
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const checkAuthTimeout = (expirationTime) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000); //millisecond to minute -->1hr
	};
};

export const auth = (email, password, isSignup) => {
	return (dispatch) => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true,
		};
		let url =
			"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBbDjJP-TJexZevEIOgWHDjoNWZDZXPnoE ";

		if (!isSignup) {
			url =
				"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBbDjJP-TJexZevEIOgWHDjoNWZDZXPnoE";
		}

		axios
			.post(url, authData)
			.then((res) => {
				console.log(res);
				const expirationTime = new Date(
					new Date().getTime() + res.data.expiresIn * 1000
				);

				localStorage.setItem("token", res.data.idToken);
				localStorage.setItem("expirationTime", expirationTime);
				localStorage.setItem("userId", res.data.localId);

				dispatch(authSuccess(res.data.idToken, res.data.localId));
				dispatch(checkAuthTimeout(res.data.expiresIn));
			})
			.catch((err) => {
				console.log(err);
				dispatch(authFail(err.response.data.error));
			});
	};
};

export const setAuthRedirectPath = (path) => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path,
	};
};

export const authCheckState = () => {
	return (dispatch) => {
		const token = localStorage.getItem("token");
		if (!token) {
			dispatch(logout);
		} else {
			const expirationTime = new Date(localStorage.getItem("expirationTime"));
			if (expirationTime <= new Date()) {
				dispatch(logout());
			} else {
				const userId = localStorage.getItem("userId");
				dispatch(authSuccess(token, userId));
				dispatch(
					checkAuthTimeout(
						(expirationTime.getTime() - new Date().getTime()) / 1000
					)
				);
			}
			// dispatch(authSuccess());
		}
	};
};
