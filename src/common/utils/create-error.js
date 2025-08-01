export const createError = (statusCode, message) => {
	const error = new Error(message ?? "Internal Server Error");
	error.status = statusCode ?? 500;
	error.statusCode = statusCode ?? 500;
	return error;
};
export const throwError = (status, message) => {
	throw createError(status, message);
};
