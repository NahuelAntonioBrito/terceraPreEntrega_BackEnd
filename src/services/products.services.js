import { ProductService } from './repositories/index.js'

export const getProducts = async (req, res) => {
    const products  = await ProductService.getAllProducts( req )
    return products
}

export const getProductsService = async (req, res) => {
    const products = await ProductService.getAllPaginatedProducts( req )
    return products
}

export const getProductByIdService = async (id) => {
    const productId = await ProductService.getProductById(id)
    return productId
}

export const addProductService = async  ( newProduct ) => {
    const productAdd = await  ProductService.createProduct(newProduct);
    console.log('Producto creado:', productAdd);
    return productAdd
}

export const updateProductService = async ( id, productUpdates) => {
    const updatedProduct = await ProductService.updateProduct(id, productUpdates);
    return updatedProduct
}

export const deleteProductService = async (id) => {
    const deletProduct = await ProductService.deleteProduct(id)
    return deletProduct
}