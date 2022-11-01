import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const Forms = ({ label, type, placeholder, name, onChange, min }) => {
	return (
		<Form.Group className="mb-3">
			<Form.Label>{label}</Form.Label>
			<Form.Control
				type={type}
				placeholder={placeholder}
				name={name}
				required
				onChange={onChange}
				minLength={min}
			/>
		</Form.Group>
	);
};

Forms.propTypes = {
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	min: PropTypes.number.isRequired,
};

export default Forms; //
