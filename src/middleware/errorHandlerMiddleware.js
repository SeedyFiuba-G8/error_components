const _ = require('lodash');

module.exports = function $errorHandlerMiddleware(logger = undefined) {
	return (err, req, res, next) => {
		if (res.headersSent) {
			return next(err);
		}

		const status = err.status || 500;

		const error = _.omitBy(
			{
				status,
				name: err.name || 'Error',
				message: err.message,
				errors: err.errors,
			},
			_.isUndefined
		);

		if (logger)
			// It would be nice to add some requestId
			logger.debug({
				message: 'Request failed',
				error,
			});

		res.status(status).json(error);
	};
};
