import { FastifyRequest, FastifyReply } from "fastify";
import * as UserService from "../services/user.service";
import { z } from "zod";

/*
    User UUID for testing: 'fe1c3120-c54a-490c-b962-296d3e0a5dfd'
*/
const userParamSchema = z.object({
	id: z.string(),
});

export const getUserDataById = async (
	request: FastifyRequest,
	reply: FastifyReply
) => {
	const { id } = userParamSchema.parse(request.params);
	const foundData = await UserService.findById(id);

	reply.status(200);
	return foundData;
};

export const addUserData = async (
	request: FastifyRequest,
	reply: FastifyReply
) => {
	const userDataSchema = z.object({
		userData: z.object({
			id: z.string(),
			email: z.string(),
			rooms: z.array(
				z.object({
					name: z.string(),
					devices: z.array(z.string()),
					coverArea: z.number(),
				})
			),
		}),
	});

	const { userData } = userDataSchema.parse(request.body);

	const existingUserData = await UserService.findById(userData.id);
	console.log("existingUserData", existingUserData);
	if (!existingUserData) {
		console.log("add all new data sent by user");
		const createdData = await UserService.create(userData);
		reply.status(201).send({ message: "user data created", createdData });
		return userData;
	} else {
		// TODO: ver se é a melhor ideia dar um overwrite nas salas mesmo
		console.log("theres some user data for this ID already");
		const updatedUserData = await UserService.update(userData);
		reply.status(204);
		return updatedUserData;
	}
};

export const deleteUserDataById = async (
	request: FastifyRequest,
	reply: FastifyReply
) => {
	const { id } = userParamSchema.parse(request.params);

	const res = await UserService.deleteById(id);

	if (!res) {
		reply.status(404).send({
			error: "Something went wrong while trying to delete this user data. Try again later.",
		});
	}

	reply.status(200).send({ message: "Data deleted successfully!" });
};
