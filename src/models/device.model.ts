import mongoose from "mongoose";
import { z } from "zod";

// o serialNumber é o fabricante que cria mesmo
// o que vai acontecer é que na collection (tabela) devices,
// aquele device com aquele serialNumber especifico deve existir

export interface IDevice {
	serialNumber: string;
	nickname?: string;
}

export const DeviceAttrSchema = z.object({
	serialNumber: z.string(),
	nickname: z.string(),
});

const DeviceSchema = new mongoose.Schema<IDevice>({
	serialNumber: String,
	nickname: String,
});

export const Device = mongoose.model("Device", DeviceSchema);
