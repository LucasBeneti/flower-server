import { Device, IDevice } from "../models/device.model";

const create = ({ serialNumber, nickname }: IDevice) =>
	Device.create({ serialNumber, nickname });

const findAll = () => Device.find();

const findBySerialNumber = ({ serialNumber }: IDevice) =>
	Device.findOne({ serialNumber }).exec();

export { create, findAll, findBySerialNumber };
