import { UserService } from "../services/repositories";
import logger from '../logger.js';

export const getUsersController = async (req, res) => {
	try {
		const users = await UserService.getAll();
		res.status(200).json(users);
	} catch (error) {
		logger.error("Error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getUsertByIdController = async (req, res) => {
	try {
		const userId = req.params.uid;

		const user = await UserService.getById(userId);
        console.log(user)

		if (!user) {
			return res.status(404).json({ error: "User not found." });
		}

		res.status(200).json({ payload: user });
	} catch (error) {
		logger.error("Error al obtener el usuario:", error.message);
		res.status(500).json({ error: error.message });
	}
};

export const addUserController = async (req, res) => {
	try {
		const data = req.body;
		const addedUser = await UserService.create(data);

		res.status(201).json({
			message: "User added successfully.",
			payload: addedUser,
		});
	} catch (error) {
		logger.error("Error adding User:", error.message);
		res.status(500).json({ error: error.message });
	} finally {
		if (res.statusCode == 201) {
			logger.error("Post completed successfully");
		} else {
			logger.http("Post failed");
		}
	}
};

export const updateUser = async (req, res) => {
	try {
		const id = req.params.uid;
		const data = req.body;

		const updatedUser = await UserService.update(id, data, {
			new: true,
		});

		if (!updatedUser) {
			return res.status(404).json({ error: `User with ID ${id} not found.` });
		}

		res.status(200).json({
			message: "User updated successfully.",
			ticket: updatedUser,
		});
	} catch (error) {
		logger.error("Error updating User:", error.message);
		res.status(500).json({ error: error.message });
	}
};

export const deleteUser = async (req, res) => {
	let deletedUser;
	try {
		const id = req.params.uid;
		deletedUser = await UserService.delete(id);

		if (!deletedUser) {
			return res.status(404).json({ error: `User with ID ${id} not found.` });
		}

		res.status(200).json({
			message: "User deleted successfully.",
			ticketDeleted: deletedUser,
		});
	} catch (error) {
		logger.error("Error deleting User:", error.message);
		res.status(500).json({ error: error.message });
	} finally {
		if (deletedUser) {
			logger.http(`User with ID ${deletedUser._id} deleted:`);
			logger.warning(deletedUser);
		}
	}
};

export const getAdminsController = async ( req, res ) => {
	try {
		const adminUsers = await UserService.getAllAdminUsers();
		console.log(adminUsers)
		res.status(200).json(adminUsers);
	} catch (error) {
		logger.error("Error to get admin user:", error.message);
		res.status(500).json({ error: error.message });
	}
}

export const getPremiumsController = async ( req, res ) => {
	try {
		const premiumUsers = await UserService.getAllPremiumUsers();
		res.status(200).json(premiumUsers);
	} catch (error) {
		logger.error("Error to get premium user:", error.message);
		res.status(500).json({ error: error.message });
	}
}

export const getNormalController = async ( req, res ) => {
	try {
		const normalUsers = await UserService.getAllNormalUsers();
		res.status(200).json(normalUsers);
	} catch (error) {
		logger.error("Error to get normal user:", error.message);
		res.status(500).json({ error: error.message });
	}
}