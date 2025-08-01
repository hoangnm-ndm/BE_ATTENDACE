import { z } from "zod";

const validBodyRequest = (schema) => (req, res, next) => {
	try {
		const data = schema.parse(req.body);
		req.body = data;
		next();
	} catch (error) {
		if (error instanceof z.ZodError) {
			const allMessages = error.issues.map((err) => err.path + ": " + err.message).join("; ");
			return res.status(400).json({
				error: allMessages,
			});
		}
		return res.status(500).json({
			error: "Internal Server Error",
		});
	}
};

export default validBodyRequest;
