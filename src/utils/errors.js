// HTTP Status Codes
// https://www.restapitutorial.com/httpstatuscodes.html

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
		// HTTP Errors
		BadRequest, // 400
		Unauthorized, // 401
		Forbidden, // 402
		NotFound, // 404
		Conflict, // 409
		InternalServerError, // 500

		// Error wrappers
		FromAxios,
	};
};

function BadRequest(message) {
	return new CustomError(400, 'Bad Request', message);
}

function Unauthorized(message) {
	return new CustomError(401, 'Unauthorized', message);
}

function Forbidden(message) {
	return new CustomError(403, 'Forbidden', message);
}

function NotFound(message) {
	return new CustomError(404, 'Not Found', message);
}

function Conflict(message) {
	return new CustomError(409, 'Conflict', message);
}

function InternalServerError() {
	return new CustomError(
		500,
		'Internal Server Error',
		'Unexpected error. Please see output from Server.'
	);
}

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
