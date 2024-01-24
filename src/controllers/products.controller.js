import { addProductService, deleteProductService, getProductByIdService, getProductsService, updateProductService } from "../services/products.services.js";
import { ProductService } from '../services/repositories/index.js'
import logger from "../logger.js";

export const getProductPaginatedController = async (req, res) => {
    const result = await ProductService.getAllPaginatedProducts( req );
    console.log("getProductPaginatedController: ", result)
    res.status(result.statuscode).json(result.response)
}

export const getProductController = async (req, res) => {
    const result = await ProductService.getAllProducts( req );
    res.json(result)
}

export const getProductByIdController = async (req, res) => {

    try{
        const id = req.params.pid;
        const productId = await getProductByIdService(id)
        if(!productId){
            logger.error("getProductById: No se encontró el producto");
            res.status(404).json({status: 'error', error: 'No Se Encontro El Producto'});
    
        }else{
            res.json({status: 'success', payload: productId});
        }   
        
    }catch(err){
        logger.error("getProductById: ", err.message)
    }
}

export const addProductController = async (req, res) => {
    const product = req.body;

    try {
        const productAdd = await addProductService(product);
        await productAdd.save();
        console.log({ status: 'success', payload: productAdd });
        res.json({ status: 'success', payload: productAdd });
    } catch (err) {
        logger.error('Error al guardar el producto:', err);
        res.status(500).json({ status: 'error', error: 'No se pudo agregar el producto' });
    }
};


export const updateProductController = async (req, res) => {
    const id = req.params.pid;
    const productUpdates = req.body;

    try {
        const updatedProduct = await updateProductService(id, productUpdates)

        if (updatedProduct) {
            res.json({ status: 'success', payload: updatedProduct });
        } else {
            logger.error("updateProduct: No se encontró el producto");
            res.status(404).json({ status: 'error', error: 'No se encontró el producto' });
        }
    } catch (err) {
        logger.error("updateProduct: ", err.message);
        res.status(500).json({ status: 'error', error: 'Error en la actualización del producto' });
    }
}

export const deleteProductController = async( req, res ) => {
    const id = req.params.pid;

    try {
        const deletProduct = await deleteProductService(id)

        if (deletProduct) {
            const products = await ProductService.getAllProducts()
            res.status(200).json({ status: 'success', payload: products })
        } else {
            logger.error("deleteProduct: No se encontró el producto");
            res.status(404).json({ status: 'error', error: 'No se encontró el producto' });
        }
    } catch (err) {
        logger.error("deleteProduct: ", err.message);
        res.status(500).json({ status: 'error', error: 'Error en la Eliminación del producto' });
    }

}