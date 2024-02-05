import userModel from './models/user.model.js';

export default class UserMongoDAO {
	getAll = async () => await userModel.find().lean().exec();
	getById = async (id) => await userModel.findById(id).lean().exec();
	create = async (data) => await userModel.create(data);
	update = async (id, data) =>
		await userModel.findByIdAndUpdate(id, data, { returnDocument: "after" });
	delete = async (id) => await userModel.findByIdAndDelete(id);
    getAllAdminUsers = async () => await userModel.find({ role: 'admin' }).lean().exec();
    getAllPremiumUsers = async () => await userModel.find({ role: 'premium' }).lean().exec();
    getAllNormalUsers = async () => await userModel.find({ role: 'user' }).lean().exec();
}