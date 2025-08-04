import { queryBuilder } from "../../common/utils/query-builder";
import Subject from "./subject.model";

export const createSubject = async (data) => {
	const subject = await Subject.create(data);
	return subject;
};

export const getAllSubjects = async (query) => {
	const { includeDeleted = false, ...queryParams } = query;
	const data = await queryBuilder(Subject, {
		...queryParams,
		includeDeleted: includeDeleted === "true",
		searchFields: ["name", "englishName", "code", "description"],
	});
	return data;
};

// Get a subject by ID
// This function retrieves a subject by its ID, ensuring it is not soft-deleted.
export const getSubjectById = async (id) => {
	return await Subject.findOne({ _id: id, deletedAt: null });
};

export const updateSubject = async (id, data) => {
	return await Subject.findOneAndUpdate(
		{ _id: id, deletedAt: null },
		{ $set: data },
		{ new: true, runValidators: true }
	);
};

export const softDeleteSubject = async (id) => {
	return await Subject.findOneAndUpdate(
		{ _id: id, deletedAt: null },
		{ $set: { deletedAt: new Date() } },
		{ new: true }
	);
};

export const restoreSubject = async (id) => {
	return await Subject.findOneAndUpdate(
		{ _id: id, deletedAt: { $ne: null } },
		{ $set: { deletedAt: null } },
		{ new: true }
	);
};

// Delete a subject (hard delete after soft delete)
export const deleteSubject = async (id) => {
	return await Subject.findOneAndDelete({ _id: id, deletedAt: null });
};
