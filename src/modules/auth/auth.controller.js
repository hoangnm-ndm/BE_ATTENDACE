import { registerSevice } from "./auth.service";

// @route   POST /api/auth/register
export const registerUser = handleAsync(async (req, res, next) => {
	const newUser = await registerSevice(req.body);
	return res.status(201).json(createResponse(res, 201, MESSAGES.AUTH.REGISTER_SUCCESS, newUser));
});
