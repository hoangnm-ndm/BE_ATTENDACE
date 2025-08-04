import swaggerAutogen from "swagger-autogen";
import { HOST, PORT } from "./environment.js";

swaggerAutogen();

const outputFile = "./src/common/configs/swagger-output.json";
const endpointsFiles = ["./src/routes.js"];

const swaggerConfig = {
	info: {
		title: "Backend API Codefarm Ecommerce K01 ThayHoangJS",
		description: "API documentation for Codefarm Ecommerce platform by ThayHoangJS",
		version: "1.0.0",
		contact: {
			name: "Support Team",
			email: "support@codefarm.edu.vn",
		},
	},
	host: `${HOST}:${PORT}`,
	basePath: "/api",
	schemes: ["http", "https"],
	consumes: ["application/json"],
	produces: ["application/json"],
	securityDefinitions: {
		BearerAuth: {
			type: "http",
			scheme: "bearer",
			bearerFormat: "JWT",
		},
	},
	definitions: {
		ErrorResponse: {
			success: false,
			message: "Error message",
			error: {},
		},
		SuccessResponse: {
			success: true,
			message: "Success message",
			data: {},
			meta: {
				total: 0,
				page: 1,
				limit: 10,
				totalPages: 1,
			},
		},
	},
};

swaggerAutogen()(outputFile, endpointsFiles, swaggerConfig);
