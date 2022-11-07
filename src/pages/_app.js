import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "../index.css";
import "../App.css";
import store from "../store";
import React from "react";
import { Provider } from "react-redux";
import PropTypes from "prop-types";

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<div className="App">
				<Component {...pageProps} />
			</div>
		</Provider>
	);
}

MyApp.propTypes = {
	Component: PropTypes.any.isRequired,
	pageProps: PropTypes.any.isRequired,
};

export default MyApp;
