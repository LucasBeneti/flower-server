import { User, IUser } from "../models/user.model";

export const create = (userInfo: IUser) => User.create(userInfo);

export const update = (userInfo: IUser) =>
	User.updateOne({ id: userInfo.id }, userInfo);

export const findAll = () => User.find();

export const findById = (id: string) => User.findOne({ id }).exec();

export const deleteById = (id: string) => User.findOneAndDelete({ id });
