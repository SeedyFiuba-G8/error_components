module.exports = function $errorHandlerMiddleware() {
	return (err, req, res, next) => {
		if (res.headersSent) {
			return next(err);
		}

		const status = err.status || 500;
		const response = {
			error: {
				status,
				name: err.name || 'Error',
				message: err.message,
				data: err.data,
				errors: err.errors,
			},
		};

		res.status(status).json(response);
	};
};
