import logger from "./../../logger.js";

export default class UserRepository {
	constructor(dao) {
		this.dao = dao;
	}

	getAll = async () => {
        try {
            return await this.dao.getAll();
        } catch (error) {
            logger.error('Error al obtener todos los usuarios: ', error);
            throw error;
        }
    }

    getById = async (id) => {
        try {
            return await this.dao.getById(id);
        } catch (error) {
            logger.error('Error al obtener el usuario: ', error);
            throw error;
        }
    }

	create = async (data) => {
        try {
            return await this.dao.create(data);
        } catch (error) {
            logger.error('Error al crear el usuario: ', error);
            throw error;
        }
    }

	update = async (id, data)=> {
        try {
            return await this.dao.update(id, data);
        } catch (error) {
            logger.error('Error al actualizar el usuario: ', error);
            throw error;
        }
    }
	delete = async (id) => {
        try {
            return await this.dao.delete(id);
        } catch (error) {
            logger.error('Error al eliminar el usuario: ', error);
            throw error;
        }
    }
    getAllAdminUsers = async () => {
        try {
            return await this.dao.getAllAdminUsers();
        } catch (error) {
            logger.error('Error al obtener todos los usuarios Admin: ', error);
            throw error;
        }
    }
    getAllPremiumUsers = async () => {
        try {
            return await this.dao.getAllPremiumUsers();
        } catch (error) {
            logger.error('Error al obtener todos los usuarios Premium: ', error);
            throw error;
        }
    }
    getAllNormalUsers = async () => {
        try {
            return await this.dao.getAllNormalUsers();
        } catch (error) {
            logger.error('Error al obtener todos los usuarios user: ', error);
            throw error;
        }
    }
}