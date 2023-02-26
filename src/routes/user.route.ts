import { FastifyInstance } from "fastify";
import { getUserInfoById, addUserData } from "../controllers/user.controller";

export async function userRoutes(app: FastifyInstance) {
	app.get("/:id", getUserInfoById);
	app.post("/", addUserData);
}
