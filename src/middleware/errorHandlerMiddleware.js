const _ = require('lodash');

module.exports = function $errorHandlerMiddleware() {
	return (err, req, res, next) => {
		if (res.headersSent) {
			return next(err);
		}

		const status = err.status || 500;

		// This is probably neccesary
		//
		// const error = _.omitBy(
		// 	{
		// 		status,
		// 		name: err.name || 'Error',
		// 		message: err.message,
		// 		data: err.data,
		// 		errors: err.errors,
		// 	},
		// 	_.isUndefined
		// );

		const response = {
			error: {
				status,
				name: err.name || 'Error',
				message: err.message,
				data: err.data,
				errors: err.errors,
			},
		};

		console.log(
			`[errorHandlerMiddleware] Sending back error with status ${status} and response: ${JSON.stringify(
				response
			)}`
		);

		res.status(status).json(response);
	};
};
