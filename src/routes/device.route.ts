import { FastifyInstance } from "fastify";

import {
	findAllDevices,
	findBySerial,
	createDevice,
} from "../controllers/device.controller";

export async function deviceRoutes(app: FastifyInstance) {
	app.get("/", findAllDevices);
	app.get("/:serial", findBySerial);
	app.post("/", createDevice);
}
