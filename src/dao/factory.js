import config from '../config/config.js';
import  ProductMongoDAO from './product.mongo.dao.js';

const persistenceType = config.app.persistence;

export const Product = {
    create: () => {
        switch (persistenceType) {
            case 'MONGO':
                return new ProductMongoDAO();

            default:
                throw new Error('Tipo de persistencia no válido');
        }
    }
};

