import { FastifyRequest, FastifyReply } from "fastify";
import * as UserService from "../services/user.service";
import { z } from "zod";

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

// TODO: implement service to update existing user information [really needed it?]
