import { fotgotPasswordService, loginService, refreshTokenService, registerSevice } from "./auth.service";
import { createResponse } from "../../common/utils/create-response";
import MESSAGES from "./auth.message";
import handleAsync from "../../common/utils/async-handler";
import { createError } from "../../common/utils/create-error";

// @route   POST /api/auth/register
export const registerUser = handleAsync(async (req, res, next) => {
	const newUser = await registerSevice(req.body);
	return createResponse(res, 201, MESSAGES.REGISTER_SUCCESS, newUser);
});

export const loginUser = handleAsync(async (req, res, next) => {
	const data = await loginService(req.body);
	return createResponse(res, 200, MESSAGES.LOGIN_SUCCESS, data);
});

// * @route POST /api/auth/refresh-token
export const refreshToken = handleAsync(async (req, res, next) => {
	const data = await refreshTokenService(req);
	return createResponse(res, 200, MESSAGES.REFRESH_TOKEN_SUCCESS, data);
});

// @route   POST /api/auth/forgot-password
export const forgotPassword = handleAsync(async (req, res, next) => {
	const isSendMail = await fotgotPasswordService(req.body.email);
	if (!isSendMail) {
		return createError(400, MESSAGES.SEND_MAIL_FAIL);
	}
	return res.status(200).json(createResponse(res, 200, MESSAGES.SEND_SUCCESS));
});

// @route POST /api/auth/reset-password/:resetToken
// Khi người dùng nhấn vào link trong email, họ sẽ được chuyển đến trang reset password,
// và trên đường dẫn sẽ có token được gửi kèm theo
// Ứng dụng React sẽ gom token từ URL và kèm theo newPassword gửi lên server
export const resetPassword = handleAsync(async (req, res, next) => {
	const { resetToken } = req.params;
	const { newPassword } = req.body;
	const decoded = jwt.verify(resetToken, RESET_PASSWORD_SECRET);
	const user = await User.findById(decoded.id);
	if (!user) return next(createError(404, MESSAGES.AUTH.USER_NOT_FOUND));
	user.password = await bcrypt.hash(newPassword, 10);
	await user.save();

	// await sendPasswordResetSuccessEmail(user.email);

	return res.status(200).json(createResponse(res, 200, MESSAGES.AUTH.PASSWORD_RESET_SUCCESS));
});
