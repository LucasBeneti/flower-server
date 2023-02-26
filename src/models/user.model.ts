import mongoose, { Schema } from "mongoose";
import { z } from "zod";

import { DeviceAttrSchema, IDevice } from "./device.model";

export const RoomSchema = z.object({
	name: z.string(),
	devices: z.array(DeviceAttrSchema),
	coverArea: z.number(),
});

export type RoomType = {
	name: string;
	devices?: string[];
	coverArea?: number;
};

// pro usuario cadastrar um device, precisa antes criar uma sala,
// e dentro dessa info, ele passa a serial do device que quer atrelar
// àquela sala
export interface IUser {
	id: string;
	email: string;
	rooms?: RoomType[];
}

const UserSchema = new Schema<IUser>({
	id: { type: String, required: true },
	email: { type: String, required: true },
	rooms: [
		{
			name: { type: String, required: true },
			devices: [String],
			coverArea: Number,
		},
	],
});

export const User = mongoose.model("User", UserSchema);
