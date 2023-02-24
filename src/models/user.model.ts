import mongoose, { Schema } from "mongoose";

type Room = {
	name: string;
	devices: [];
	cover_area?: number;
};

export interface IUser {
	id: string;
	email: string;
	devices?: [];
	rooms: Room[];
}

const UserSchema = new Schema<IUser>({
	id: String,
	email: String,
	devices: [],
	rooms: [
		{ name: String, devices: [{ serial: String }], cover_area: Number },
	],
});

export const User = mongoose.model("User", UserSchema);
