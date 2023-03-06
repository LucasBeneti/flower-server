import { FastifyInstance } from "fastify";
import {
	getUserDataById,
	addUserData,
	deleteUserDataById,
} from "../controllers/user.controller";

export async function userRoutes(app: FastifyInstance) {
	app.get("/:id", getUserDataById);
	app.post("/", addUserData);
	app.delete("/:id", deleteUserDataById);
}
