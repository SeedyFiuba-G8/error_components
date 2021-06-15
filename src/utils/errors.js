const createHttpError = require('http-errors');

class CustomError extends Error {
	constructor(
		status,
		name,
		message = undefined,
		data = undefined,
		errors = undefined
	) {
		super(name);
		this.status = status;
		this.name = name;
		this.message = message;
		this.data = data;
		this.errors = errors;
	}
}

module.exports = function $errors() {
	return {
		// HTTP Status Codes
		// https://www.restapitutorial.com/httpstatuscodes.html
		create: createHttpError,

		// Custom errors
		UnknownError: createHttpError(
			500,
			'Unexpected error. Please see output from Server.'
		),

		// Error wrappers
		FromAxios,
	};
};

function FromAxios(axiosErr) {
	const err = axiosErr.response.data.error;
	return new CustomError(
		err.status,
		err.name,
		err.message,
		err.data,
		err.errors
	);
}
