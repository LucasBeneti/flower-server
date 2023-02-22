import { FastifyRequest, FastifyReply } from "fastify";
import * as MeasurementsService from "../services/measurements.service";
import { z } from "zod";

const serialParamSchema = z.object({
	serial: z.string(),
});

export const getDataBySerialNumber = async (
	request: FastifyRequest,
	reply: FastifyReply
) => {
	const { serial } = serialParamSchema.parse(request.params);

	const foundData = await MeasurementsService.findAllBySerialNumber(serial);

	if (foundData.length === 0) {
		reply.status(200).send({
			message: `No data was found related to the serial number ${serial}`,
		});
	}

	reply.status(200).send(foundData);
};

export const setDataBySerialNumber = async (
	request: FastifyRequest,
	reply: FastifyReply
) => {
	const { serial } = serialParamSchema.parse(request.params);
	const bodySchema = z.object({
		t: z.number(),
		h: z.number(),
		co2: z.number(),
		vpd: z.number(),
		dp: z.number(),
	});
	const body = bodySchema.parse(request.body);
	const newData = await MeasurementsService.create({
		...body,
		metadata: { d_sn: serial },
	});

	if (!newData) {
		reply.status(404).send({ error: "Something went wrong" });
	}

	reply.status(201).send({ message: "Data point created!", newData });
};
