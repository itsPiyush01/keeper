import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import "./Auth.css";
import * as actions from "../../store/actions/index";
import { updateObject, checkValidity } from "../../utility/Utility";
import { HashRouter as Router } from "react-router-dom";

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "Mail Address",
				},
				value: "",
				validation: {
					required: true,
					isEmail: true,
				},
				valid: false,
				touched: false,
			},
			password: {
				elementType: "input",
				elementConfig: {
					type: "password",
					placeholder: "Password",
				},
				value: "",
				validation: {
					required: true,
					minLength: 6,
				},
				valid: false,
				touched: false,
			},
		},
		isSignup: false,
	};

	inputChangedHandler = (event, controlName) => {
		const updatedControls = updateObject(this.state.controls, {
			[controlName]: updateObject(this.state.controls[controlName], {
				value: event.target.value,
				valid: checkValidity(
					event.target.value,
					this.state.controls[controlName].validation
				),
				touched: true,
			}),
		});
		this.setState({ controls: updatedControls });
	};

	submitHandler = (event) => {
		event.preventDefault();
		this.props.onAuth(
			this.state.controls.email.value,
			this.state.controls.password.value,
			this.state.isSignup
		);
	};

	switchAuthModeHandler = () => {
		this.setState((prevState) => {
			return { isSignup: !prevState.isSignup };
		});
	};
	errorConfirmedHandler = () => {
		this.props.onClear();
	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key],
			});
		}

		let form = formElementsArray.map((formElement) => (
			<Input
				key={formElement.id}
				elementType={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.config.value}
				invalid={!formElement.config.valid}
				shouldValidate={formElement.config.validation}
				touched={formElement.config.touched}
				changed={(event) => this.inputChangedHandler(event, formElement.id)}
			/>
		));

		if (this.props.loading) {
			form = <Spinner />;
		}

		let errorMessage = null;

		if (this.props.error) {
			errorMessage = <p>{this.props.error.message}</p>;
		}

		let authRedirect = null;
		if (this.props.isAuthenticated) {
			authRedirect = <Redirect to={this.props.authRedirectPath} />;
		}
		return (
			<div className="Auth">
				{authRedirect}

				<h1>{this.state.isSignup ? "SIGN UP" : "LOGIN"}</h1>

				<form onSubmit={this.submitHandler}>
					{form}

					<p
						style={{
							color: "red ",
							textAlign: "start",
							marginLeft: "10px",
						}}
					>
						{errorMessage}
					</p>

					<Button btnType="Success">SUBMIT</Button>
				</form>
				<Router>
					<div className="App">
						<div className="appAside">
							{/* <img className="logo" src={logo} alt="this is logo" /> */}
						</div>
						<div className="appForm">
							<div className="pageSwitcher">
								<button
									className={
										this.state.isSignup
											? " pageSwitcherItem "
											: " pageSwitcherItem pageSwitcherItem-active"
									}
									onClick={this.switchAuthModeHandler}
									disabled={!this.state.isSignup}
								>
									Login
								</button>
								<button
									className={
										!this.state.isSignup
											? "pageSwitcherItem "
											: " pageSwitcherItem pageSwitcherItem-active "
									}
									onClick={this.switchAuthModeHandler}
									disabled={this.state.isSignup}
								>
									Sign Up
								</button>
							</div>
						</div>
					</div>
				</Router>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	// debugger;
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		authRedirectPath: state.auth.authRedirectPath,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password, isSignup) =>
			dispatch(actions.auth(email, password, isSignup)),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
