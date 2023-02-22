import { Measurement, IMeasurement } from "../models/measurements.model";

const findAll = () => Measurement.find();

const findAllBySerialNumber = (serial: string) =>
	Measurement.find({ metadata: { d_sn: serial } });

const create = (body: IMeasurement) =>
	Measurement.create({
		t: body.t,
		h: body.h,
		co2: body.co2,
		vpd: body.vpd,
		dp: body.dp,
		metadata: body.metadata,
		timestamp: new Date(),
	});

export { findAll, findAllBySerialNumber, create };
