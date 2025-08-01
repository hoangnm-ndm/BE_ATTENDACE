import { FRONTEND_URL, RESET_PASSWORD_EXPIRES, RESET_PASSWORD_SECRET } from "../../common/configs/environment.js";
import { generateStudentId, generateUsername } from "../../common/utils/code-generator.js";
import { createError, throwError } from "../../common/utils/create-error.js";
import { signToken, verifyToken } from "../../common/utils/jwt.js";
import { comparePassword, hashPassword } from "../../common/utils/password-handler.js";
import sendEmail from "../../common/utils/send-email.js";
import User from "../user/user.model.js";
import MESSAGES from "./auth.message.js";
import { generatePasswordResetSuccessEmail, generateResetPasswordEmail } from "./auth.view";

export const sendResetPasswordEmail = async (email, resetLink, expiresIn = "15 phút") => {
	const subject = "[CodeFarm] Đặt lại mật khẩu cho tài khoản của bạn";
	const html = generateResetPasswordEmail(resetLink, expiresIn);

	await sendEmail(email, subject, { html });
};

export const sendPasswordResetSuccessEmail = async (email) => {
	const subject = "Mật khẩu đã được đặt lại";
	const html = generatePasswordResetSuccessEmail();

	await sendEmail(email, subject, { html });
};

export const registerSevice = async (dataRegister) => {
	const { email, password, fullname, role } = dataRegister;

	//* 1. Kiểm tra email người dùng đã đăng ký chưa?
	const existingUser = await User.findOne({ email });
	if (existingUser) {
		return next(createError(400, MESSAGES.EMAIL_ALREADY_EXISTS));
	}

	//* 2. Mã hoá mật khẩu
	const passwordHash = await hashPassword(password);

	//* 3. Tạo ra username dựa vào fullname của người dùng
	// Generate username
	const username = await generateUsername(fullname);

	//* 4. Tạo ra studentId nếu role = student
	let studentId = await generateStudentId();

	//* 5. Create new user
	// Tương lai có thể bổ sung thêm tính năng ngăn chặn người dùng tự đặt role của mình là superadmin
	const newUser = await User.create({
		...dataRegister,
		password: passwordHash,
		username,
		studentId,
	});

	newUser.password = undefined;
	return newUser;
};

export const loginService = async (dataLogin) => {
	const { email, password } = dataLogin;

	const user = await User.findOne({ email });
	if (!user) return next(createError(401, MESSAGES.USER_NOT_FOUND));

	const isMatch = comparePassword(password, user.password);
	if (!isMatch) return next(createError(401, MESSAGES.INVALID_PASSWORD));

	const accessToken = signToken({ id: user._id }, "1d");
	const refreshToken = signToken({ id: user._id }, "30d");

	user.password = undefined;

	return {
		user,
		accessToken,
		refreshToken,
	};
};

export const refreshTokenService = async (refreshToken) => {
	console.log(refreshToken);
	if (!refreshToken) {
		return createError(401, MESSAGES.INVALID_REFRESH_TOKEN);
	}

	const { valid, decoded } = verifyToken(refreshToken);
	if (valid) {
		const accessToken = signToken({ id: decoded.id }, "1d");
		const newRefreshToken = signToken({ id: decoded.id }, "30d");
		return { accessToken, refreshToken: newRefreshToken };
	}
};

export const fotgotPasswordService = async (email) => {
	const user = await User.findOne({ email });
	if (!user) return next(createError(404, MESSAGES.USER_NOT_FOUND));

	// * 1. Gửi mail cho họ với 1 OTP (One-time-password) có 6 chữ số ngẫu nhiên.
	// * 2. Gửi cho họ link chứa mã bí mật, link dẫn đến FE (có trải nghiệm người dùng tốt hơn vì người dùng không phải nhập các số ngẫu nhiên, an toàn hơn vì những sơ xuất của người dùng, không thực sự hỗ trợ tốt cho đa nền tảng)

	// 1. Dùng mã 6 chữ số. (không làm)

	// 2. Giải pháp 2 - dùng token
	const resetToken = signToken({ id: user._id, role: user.role }, RESET_PASSWORD_EXPIRES || "15m");

	const resetLink = `${FRONTEND_URL}/auth/reset-password/${resetToken}`;
	await sendResetPasswordEmail(email, resetLink, RESET_PASSWORD_EXPIRES);
	return true;
};

export const resetPasswordService = async (resetToken, newPassword) => {
	const decoded = verifyToken(resetToken);

	console.log(decoded);
	const user = await User.findById(decoded.decoded.id);
	console.log(user);

	if (!user) return false;

	user.password = await hashPassword(newPassword);
	await user.save();
	await sendPasswordResetSuccessEmail(user.email);
	return true;
};
