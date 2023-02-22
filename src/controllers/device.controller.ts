import { FastifyRequest, FastifyReply } from "fastify";

import * as deviceService from "../services/device.service";

import { z } from "zod";

export const findAllDevices = async (
	request: FastifyRequest,
	reply: FastifyReply
) => {
	const devices = await deviceService.findAll();

	if (devices.length === 0) {
		reply
			.status(200)
			.send({ message: "There`s no devices registered yet." });
	}

	reply.status(200).send(devices);
};

export const findBySerial = async (
	request: FastifyRequest,
	reply: FastifyReply
) => {
	const getDeviceBySerialNumber = z.object({
		serial: z.string(),
	});

	const { serial } = getDeviceBySerialNumber.parse(request.params);

	const foundDevice = await deviceService.findBySerialNumber({
		serialNumber: serial,
	});

	reply.status(200);
	return foundDevice;
};

export const createDevice = async (
	request: FastifyRequest,
	reply: FastifyReply
) => {
	const createDeviceSchema = z.object({
		serialNumber: z.string(),
		nickname: z.string(),
	});

	const { serialNumber, nickname } = createDeviceSchema.parse(request.body);

	if (!serialNumber) {
		reply
			.status(400)
			.send({ error: "Device serial number cannot be empty" });
	}

	const createdDevice = await deviceService.create({
		serialNumber,
		nickname,
	});

	if (!createdDevice) {
		reply.status(404).send({
			error: "Sorry, something went wrong while trying to create a new device...",
		});
	}

	reply.status(201).send(createdDevice);
};
