import axios from "../../axios-notes";
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

// export const checkAuthTimeout = (expirationTime) => {
// 	return (dispatch) => {
// 		setTimeout(() => {
// 			dispatch(logout());
// 		}, expirationTime * 1000); //millisecond to minute -->1hr
// 	};
// };

export const auth = (email, password, isSignup) => {
	return (dispatch) => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true,
		};
		let url =
			"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBbDjJP-TJexZevEIOgWHDjoNWZDZXPnoE";

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
				// localStorage.setItem("refreshToken", res.data.refreshToken); ///refreshToken

				dispatch(authSuccess(res.data.idToken, res.data.localId));

				// dispatch(checkAuthTimeout(res.data.expiresIn));
				/*Refresh Token after every hr 1 */
			})
			.catch((err) => {
				// debugger;
				if (err.response !== undefined) {
					console.log(err.response.data.error); //.error.message
					dispatch(authFail(err.response.data.error));
				} else {
					dispatch(authFail(err));
				}
			});
	};
};
/* Refresh Token*/
/*
export const refreshTokenInterval = () => {
	// refreshToken

	// getToken() {

	// 	// clearTimeout(this.tokenExpire);
	// 	// this.tokenExpire = setTimeout(() => getToken(), 5000);
	//  }

	return (dispatch) => {
		let refreshToken = localStorage.getItem("refreshToken");
		if (!refreshToken) {
			dispatch(logout);
		} else {
			let url =
				"https://securetoken.googleapis.com/v1/token?key=AIzaSyBbDjJP-TJexZevEIOgWHDjoNWZDZXPnoE";

			let payload = {
				grant_type: "refresh_token",
				refresh_token: refreshToken,
			};
			axios
				.post(url, payload)
				.then((res) => {
					console.log(res);
					const expirationTime = new Date(
						new Date().getTime() + res.data.expiresIn * 1000
					);

					localStorage.setItem("token", res.data.idToken);
					localStorage.setItem("refreshToken", res.data.refreshToken); ///refreshToken
					localStorage.setItem("expirationTime", expirationTime);
					localStorage.setItem("userId", res.data.localId);
					dispatch(authSuccess(res.data.idToken, res.data.localId));

					clearTimeout(this.tokenExpire);
					this.tokenExpire = setTimeout(() => refreshTokenInterval(), 1000);
				})
				.catch((err) => {
					console.log(err);
					dispatch(authFail(err.response.data.error));
					clearTimeout(this.tokenExpire);
				});
		}
	};
};
*/

export const setAuthRedirectPath = (path) => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path,
	};
};

export const authCheckState = () => {
	// debugger;
	return (dispatch) => {
		const token = localStorage.getItem("token");
		if (!token) {
			console.log("!TOKEN");
			// dispatch(logout);
		} else {
			const expirationTime = new Date(localStorage.getItem("expirationTime"));
			if (expirationTime <= new Date()) {
				// TODO: Refresh the Token
				/* Refresh Token */
				// const userId = localStorage.getItem("userId");
				// dispatch(authSuccess(token, userId));
			} else {
				const userId = localStorage.getItem("userId");
				dispatch(authSuccess(token, userId));
			}
		}
	};
};
