import mongoose from "mongoose";
import { queryBuilder } from "../../common/utils/query-builder.js";
import Class from "./class.model.js";
import Session from "../session/session.model.js";
import { createError } from "../../common/utils/create-error.js";
import { generateSessionDates } from "./class.utils.js";

/**
 * * Create class
 * * Lấy class theo ID
 * * Lấy class theo sinh viên
 * * Lấy toàn bộ class (filter: majorId, subjectId, teacherId)
 * * Update class
 * * Xoá mềm, xoá cứng, khôi phục
 */

// Create a new class
export const createClass = async (data) => {
	// Sử dụng transaction để đảm bảo tính toàn vẹn dữ liệu
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		// * Nên kiểm tra studentIds là một mảng không trùng, check student tồn tại
		// * Kiểm tra teacherId tồn tại
		// * Kiểm tra subjectId, majorId
		// * Kiểm tra startDate phải lớn hơn thời điểm ngày hiện tại

		const { totalSessions, startDate, daysOfWeek } = data;

		// Tạo lớp học
		const createdClass = await Class.create(data, { session });

		const datesOfWeek = daysOfWeek.split(",").map(Number);

		// Tạo các buổi học trong Sessions
		const sessionDates = generateSessionDates(new Date(startDate), totalSessions, datesOfWeek);

		// Tạo buổi học
		const sessions = sessionDates.map((sessionDate) => ({
			classId: createdClass._id,
			sessionDate,
			note: "", // Ghi chú mặc định rỗng
		}));

		// Tạo các document trong Sessions
		await Session.insertMany(sessions, { session });

		// Commit transaction
		await session.commitTransaction();
		session.endSession();

		return classInstance[0];
	} catch (error) {
		// Rollback transaction nếu có lỗi
		await session.abortTransaction();
		session.endSession();
		throw createError(error.status || 500, error.message || "Failed to create class");
	}
};

// Get all classes (with optional inclusion of soft-deleted records)
export const getAllClasses = async (query) => {
	const { includeDeleted = false, ...queryParams } = query;
	const data = await queryBuilder(
		Class,
		{
			...queryParams,
			includeDeleted: includeDeleted === "true",
			searchFields: ["name", "teacherId", "subjectId", "majorId"],
		},
		{
			populate: [
				{ path: "teacherId", select: "name" },
				{ path: "subjectId", select: "name" },
				{ path: "majorId", select: "name" },
			],
		}
	);

	return data;
};

// Get a class by ID
export const getClassById = async (id) => {
	return await Class.findOne({ _id: id, deletedAt: null }).populate("subjectId majorId teacherId studentIds");
};

// Update a class
export const updateClass = async (id, data) => {
	return await Class.findOneAndUpdate(
		{ _id: id, deletedAt: null },
		{ $set: data },
		{ new: true, runValidators: true }
	).populate("subjectId majorId teacherId studentIds");
};

// Soft delete a class
export const softDeleteClass = async (id) => {
	return await Class.findOneAndUpdate({ _id: id, deletedAt: null }, { $set: { deletedAt: new Date() } }, { new: true });
};

// Restore a soft-deleted class
export const restoreClass = async (id) => {
	return await Class.findOneAndUpdate(
		{ _id: id, deletedAt: { $ne: null } },
		{ $set: { deletedAt: null } },
		{ new: true }
	).populate("subjectId majorId teacherId studentIds");
};

export const deleteClass = async (id) => {
	return await Class.findOneAndDelete({ _id: id, deletedAt: null }, { new: true });
};
