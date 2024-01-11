import { Product } from '../../dao/factory.js';
import ProductRepository from './product.repository.js';
import config from '../../config/config.js';


const productDAO = Product.create(config);
export const ProductService = new ProductRepository(productDAO)
