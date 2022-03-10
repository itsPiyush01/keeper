import React, { useEffect } from "react";
import Header from "./components/UI/Header/Header";
import Notes from "./components/Notes/Notes";
import { connect } from "react-redux";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/UI/Theme/globalStyles";
import { lightTheme, darkTheme } from "./components/UI/Theme/Theme";
import { useDarkMode } from "./hooks/useDarkMode";
import * as actions from "./store/actions/index";
import Auth from "./containers/Auth/Auth";
import { Route, Switch, Redirect } from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";

const NotesComponent = () => {
	const [theme, themeToggler, mountedComponent] = useDarkMode();
	const themeMode = theme === "dark" ? darkTheme : lightTheme;

	if (!mountedComponent) return <div />;
	return (
		<ThemeProvider theme={themeMode}>
			<React.Fragment>
				<GlobalStyles />
				<Header theme={theme} themeToggler={themeToggler} />
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

// const Logout = () => {
// 	return <h1>Logout</h1>;
// };

const App = (props) => {
	useEffect(() => {
		props.onTryAutoSignup();
		console.log("[useEffect]");
	});
	let routes = (
		<Switch>
			<Route path="/" component={Auth} />
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
	// debugger;
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
