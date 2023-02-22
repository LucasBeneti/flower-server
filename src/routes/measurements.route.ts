import { FastifyInstance } from "fastify";

import {
	getDataBySerialNumber,
	setDataBySerialNumber,
} from "../controllers/measurements.controller";

export async function measurementsRoutes(app: FastifyInstance) {
	app.get("/:serial", getDataBySerialNumber);
	app.post("/:serial", setDataBySerialNumber);
}
