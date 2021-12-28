import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import thunk from "redux-thunk";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import authReducer from "./store/reducer/auth";
import noteReducer from "./store/reducer/Note";

/*Middleware*/
const logger = (store) => {
	return (next) => {
		return (action) => {
			// console.log("[Middleware] Dispatching", action);
			const result = next(action);
			// console.log("[Middleware] next state ", store.getState());
			return result;
		};
	};
};

const composeEnhancers =
	process.env.NODE_ENV === "development"
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: null || compose;

const rootReducer = combineReducers({
	auth: authReducer,
	notes: noteReducer,
});

//allow us to create new redux store
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk, logger))
);

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);
ReactDOM.render(app, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
