const _ = require('lodash');
const createHttpError = require('http-errors');

class CustomError extends Error {
	constructor(err) {
		const name = _.get(err, 'name', 'Error');
		super(name);
		this.status =
			_.get(err, 'status') || _.get(err, 'response.status', 500);
		this.name = name;
		this.message = _.get(err, 'message');
		this.errors = _.get(err, 'errors');
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
	const err = _.get(axiosErr, 'response.data', axiosErr);
	return new CustomError(err);
}
