import * as classService from "./class.service.js";
import handleAsync from "../../common/utils/async-handler.js";
import { createResponse } from "../../common/utils/create-response.js";
import { createError } from "../../common/utils/create-error.js";
import MESSAGES from "./class.message.js";

// Create a new class
export const createClass = handleAsync(async (req, res) => {
	const classInstance = await classService.createClass(req.body);
	return createResponse(res, 201, MESSAGES.CREATED, classInstance);
});

// Get all classes (with soft delete support)
export const getAllClasses = handleAsync(async (req, res) => {
	const data = await classService.getAllClasses(req.query);
	return createResponse(res, 200, MESSAGES.GET_SUCCESS, data.data, data.meta);
});

// Get a class by ID
export const getClassById = handleAsync(async (req, res) => {
	const classInstance = await classService.getClassById(req.params.id);
	if (!classInstance) {
		throw createError(404, MESSAGES.NOT_FOUND);
	}
	return createResponse(res, 200, MESSAGES.GET_BY_ID_SUCCESS, classInstance);
});

// Update a class
export const updateClass = handleAsync(async (req, res) => {
	const classInstance = await classService.updateClass(req.params.id, req.body);
	if (!classInstance) {
		throw createError(404, MESSAGES.NOT_FOUND);
	}
	return createResponse(res, 200, MESSAGES.UPDATED_SUCCESS, classInstance);
});

// Soft delete a class
export const softDeleteClass = handleAsync(async (req, res) => {
	const classInstance = await classService.softDeleteClass(req.params.id);
	if (!classInstance) {
		throw createError(404, MESSAGES.NOT_FOUND);
	}
	return createResponse(res, 200, MESSAGES.DELETED_SUCCESS);
});

// Restore a soft-deleted class
export const restoreClass = handleAsync(async (req, res) => {
	const classInstance = await classService.restoreClass(req.params.id);
	if (!classInstance) {
		throw createError(404, MESSAGES.NOT_FOUND);
	}
	return createResponse(res, 200, MESSAGES.RESTORED_SUCCESS, classInstance);
});

export const deleteClass = handleAsync(async (req, res) => {
	const classInstance = await classService.deleteClass(req.params.id);
	if (!classInstance) {
		throw createError(404, MESSAGES.NOT_FOUND);
	}
	return createResponse(res, 200, MESSAGES.DELETED_SUCCESS, classInstance);
});
