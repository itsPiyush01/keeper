import React, { useState } from "react";
import Header from "./components/UI/Header/Header";
import Notes from "./components/Notes/Notes";
// import createDate from "../utility/dateFormatter";
import { connect } from "react-redux";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/UI/Theme/globalStyles";
import Toggle from "./components/UI/Theme/Toggle";
import { lightTheme, darkTheme } from "./components/UI/Theme/Theme";
import { useDarkMode } from "./hooks/useDarkMode";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import * as actions from "./store/actions/index";

import {
	Route,
	Switch,
	withRouter,
	Redirect,
	BrowserRouter as Router,
} from "react-router-dom";

const asyncAuth = asyncComponent(() => {
	return import("./containers/Auth/Auth");
});

const NotesComponent = () => {
	const [theme, themeToggler, mountedComponent] = useDarkMode();
	const themeMode = theme === "dark" ? lightTheme : darkTheme;

	if (!mountedComponent) return <div />;
	return (
		<ThemeProvider theme={themeMode}>
			<React.Fragment>
				{/* <Toggle theme={theme} toggleTheme={themeToggler} /> */}
				<GlobalStyles />
				<Header toggleTheme={themeToggler} />
				<Notes theme={themeMode} />
			</React.Fragment>
		</ThemeProvider>
	);
};

// function App(props) {
//   const [theme, themeToggler, mountedComponent] = useDarkMode();
//   const themeMode = theme === "dark" ? lightTheme : darkTheme;
//   if (!mountedComponent) return <div />;
//   return (
//     <ThemeProvider theme={themeMode}>
//       <React.Fragment>
//         {/* <Toggle theme={theme} toggleTheme={themeToggler} /> */}
//         <GlobalStyles />
//         <Header toggleTheme={themeToggler} />
//         <Notes theme={themeMode} />
//       </React.Fragment>
//     </ThemeProvider>
//   );
// }

const Logout = () => {
	return <h1>Logout</h1>;
};

const App = (props) => {
	let routes = (
		<Switch>
			<Route path="/auth" component={asyncAuth} />
			<Route path="/" exact component={asyncAuth} />
			<Redirect to="/" />
		</Switch>
	);

	if (props.isAuthenticated) {
		routes = (
			<Switch>
				<Route path="/logout" component={Logout} />
				<Route path="/" exact component={NotesComponent} />
				<Redirect to="/" />
			</Switch>
		);
	}
	return <div>{routes}</div>;
};

// const AppWrapper = () => {
// 	return (
// 		<Router>
// 			<App />
// 		</Router>
// 	);
// };
// export default App;
// export default AppWrapper;
const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.token !== null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
