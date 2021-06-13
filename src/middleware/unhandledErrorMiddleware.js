module.exports = function $unhandledErrorMiddleware(errors) {
	return (req, res, next) => {
		process.on('unhandledRejection', (err) => {
			return next(err);
		});

		return next();
	};
};
