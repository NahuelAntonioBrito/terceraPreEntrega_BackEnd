import { Product } from '../../dao/factory.js';
import ProductRepository from './product.repository.js';
import config from '../../config/config.js';

const productDAO = Product.create(config);

const ProductService = new ProductRepository(productDAO)
export { ProductService };