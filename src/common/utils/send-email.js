import nodemailer from "nodemailer";
import { createError } from "./create-error.js";
import { EMAIL_PASSWORD, EMAIL_USERNAME } from "../configs/environment.js";

const sendEmail = async (email, subject, options = {}) => {
	const { text, html } = options;

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: EMAIL_USERNAME || "hoangnm.bg@gmail.com",
			pass: EMAIL_PASSWORD,
		},
	});

	const mailOptions = {
		from: '"CodeFarm" <hoangnm.bg@gmail.com>',
		to: email,
		subject: subject,
		text: text || "This email requires an HTML-compatible email client.",
		html: html || text,
	};

	try {
		await transporter.sendMail(mailOptions);
	} catch (error) {
		throw createError(500, `Gửi email thất bại: ${error.message}`);
	}
};

export default sendEmail;
