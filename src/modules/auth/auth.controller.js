import { loginService, registerSevice } from "./auth.service";
import { createResponse } from "../../common/utils/create-response";
import MESSAGES from "./auth.message";
import handleAsync from "../../common/utils/async-handler";

// @route   POST /api/auth/register
export const registerUser = handleAsync(async (req, res, next) => {
	const newUser = await registerSevice(req.body);
	return createResponse(res, 201, MESSAGES.REGISTER_SUCCESS, newUser);
});

export const loginUser = handleAsync(async (req, res, next) => {
	const data = await loginService(req.body);
	return createResponse(res, 200, MESSAGES.LOGIN_SUCCESS, data);
});
