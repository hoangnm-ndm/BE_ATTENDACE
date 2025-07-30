import bcrypt from "bcryptjs";

// * src/common/utils/password-handler.js
export const hashPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);
	console.log(hash);
	return hash;
};

export const comparePassword = async (password, hash) => {
	const isMath = await bcrypt.compare(password, hash);
	return isMath;
};

export const randomPassword = (length = 8) => {
	const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
	let password = "";
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * charset.length);
		password += charset[randomIndex];
	}
	return password;
};
