import handleAsync from "../../common/utils/async-handler";
import { throwError } from "../../common/utils/create-error";
import MESSAGES from "./class.message";
import * as classServices from "./class.service";

export const createClass = handleAsync(async (req, res) => {
	const classInstance = await classServices.createClass(req.body);
	!classInstance && throwError(400, MESSAGES.CREATE_ERROR);
	return createResponse(res, 201, MESSAGES.CREATED_SUCCESS, classInstance);
});
