import User from "../user/user.model.js";
import MESSAGES from "./auth.message.js";
import { createError } from "../../common/utils/create-error.js";
import { hashPassword } from "../../common/utils/password-handler.js";

export const registerSevice = handleAsync(async (dataRegister) => {
	const { email, password, fullname, role } = dataRegister;

	//* 1. Kiểm tra email người dùng đã đăng ký chưa?
	const existingUser = await User.findOne({ email });
	if (existingUser) {
		return next(createError(400, MESSAGES.EMAIL_ALREADY_EXISTS));
	}

	//* 2. Mã hoá mật khẩu
	const passwordHash = hashPassword(password);

	//* 3. Tạo ra username dựa vào fullname của người dùng
	// Generate username
	const username = await generateUsername(fullname);

	//* 4. Tạo ra studentId nếu role = student
	let studentId = null;
	if (role === "student") {
		studentId = await generateStudentId();
	}

	// 4. Create new user
	// Tương lai có thể bổ sung thêm tính năng ngăn chặn người dùng tự đặt role của mình là superadmin
	const newUser = await User.create({
		...req.body,
		password: passwordHash,
		username,
		studentId,
	});

	newUser.password = undefined;
});
