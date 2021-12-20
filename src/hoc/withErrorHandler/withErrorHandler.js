import React, { Component } from "react";

import ErrorModal from "../../components/UI/ErrorModal/ErrorModal";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { compose } from "redux";

const ErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		componentWillMount() {
			this.reqInterceptor = axios.interceptors.request.use(
				(req) => req,
				(error) => {
					return Promise.reject(error);
					// this.props.onFail(error.message);
				}
			);

			this.resInterceptor = axios.interceptors.response.use(
				(res) => res,
				(error) => {
					return Promise.reject(error);
					// this.props.onFail(error.message);
				}
			);
		}

		componentWillUnmount() {
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.response.eject(this.resInterceptor);
		}

		errorConfirmedHandler = () => {
			this.props.onClear();
		};

		render() {
			return (
				<React.Fragment>
					<ErrorModal
						show={this.props.error}
						modalClosed={() => {
							this.errorConfirmedHandler();
						}}
					>
						{this.props.error ? this.props.error : null}
					</ErrorModal>

					<WrappedComponent {...this.props} />
				</React.Fragment>
			);
		}
	};
};

const mapStateToProps = (state) => {
	return {
		error: state.notes.error,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onClear: () => dispatch(actions.httpClear()),
		// onFail: (error) => dispatch(actions.httpFail(error)),
	};
};

const withErrorHandler = compose(
	connect(mapStateToProps, mapDispatchToProps),
	ErrorHandler
);
export default withErrorHandler;
