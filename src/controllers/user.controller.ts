import { FastifyRequest, FastifyReply } from "fastify";
import * as UserService from "../services/user.service";
import { IUser, RoomType } from "../models/user.model";
import { z } from "zod";

/*
    User UUID for testing: 'fe1c3120-c54a-490c-b962-296d3e0a5dfd'
*/

// TODO: implement search for user configs by UUID
export const getUserInfoById = async (
	request: FastifyRequest,
	reply: FastifyReply
) => {
	const userParamSchema = z.object({
		id: z.string(),
	});

	const { id } = userParamSchema.parse(request.params);
	const foundData = await UserService.findById(id);

	reply.status(200);
	return foundData;
};

// TODO: implement service to create new user information
// this will handle if the user already exists
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
	// quando o usuario for fazer esse request, ele estará identificado com UUID única a ele
	// entao já dá pra pressupor que ele enviará essa informação

	// TODO: buscar informações sobre esse usuário com a UUID dele
	const existingUserData = await UserService.findById(userData.id);
	console.log(existingUserData);
	if (!existingUserData) {
		console.log("add all new data sent by user");
		const createdData = await UserService.create(userData);
		reply.status(201).send({ message: "user data created", createdData });
		return userData;
	} else {
		console.log("theres some user data for this ID already");
		reply.status(200);
		return existingUserData;
	}
};

// TODO: implement service to update existing user information [really needed it?]
