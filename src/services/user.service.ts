import { User, IUser } from "../models/user.model";

export const create = (userInfo: IUser) => User.create(userInfo);

export const findAll = () => User.find();

export const findById = (id: string) => User.findOne({ id }).exec();
