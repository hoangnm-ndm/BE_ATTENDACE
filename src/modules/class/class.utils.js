import { createError } from "../../common/utils/create-error";

// Hàm tính toán ngày cho các buổi học dựa trên daysOfWeek
/* * @param {Date} startDate - Ngày bắt đầu của lớp học
 * @param {number} totalSessions - Tổng số buổi học
 * @param {Array<number>} daysOfWeek - Mảng các ngày trong tuần (0-6, với 0 là Chủ nhật)
 * @returns {Array<Date>} - Mảng các ngày của buổi học
 */

export const generateSessionDates = (startDate, totalSessions, daysOfWeek = [1]) => {
	if (!daysOfWeek || daysOfWeek.length === 0) {
		throw createError(400, "daysOfWeek is required and cannot be empty");
	}

	const sessionDates = [];
	let sessionCount = 0;
	let currentWeek = 0;

	while (sessionCount < totalSessions) {
		for (const day of daysOfWeek) {
			if (sessionCount >= totalSessions) break;
			const nextDate = new Date(startDate);
			// Tính ngày dựa trên ngày bắt đầu và ngày trong tuần được chọn
			nextDate.setDate(startDate.getDate() + ((day - startDate.getDay() + 7) % 7) + currentWeek * 7);
			sessionDates.push(nextDate);
			sessionCount++;
		}
		currentWeek++; // Chuyển sang tuần tiếp theo
	}

	// Sắp xếp các ngày theo thứ tự tăng dần
	return sessionDates.sort((a, b) => a - b);
};
