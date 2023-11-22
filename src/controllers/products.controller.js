import { addProductService, deleteProductService, getProductByIdService, getProductsService, updateProductService } from "../services/products.services.js";


export const getProductController = async (req, res) => {
    const result = await getProductsService(req, res)
    res.status(result.statuscode).json(result.response)
}

export const getProductByIdController = async (req, res) => {

    try{
        const id = req.params.pid;
        const productId = await getProductByIdService(id)
        if(!productId){
            res.status(404).json({status: 'error', error: 'No Se Encontro El Producto'});
    
        }else{
            res.json({status: 'success', payload: productId});
        }   
        
    }catch(err){
        console.log(err.message)
    }
}

export const addProductController = async( req, res) =>{
    const product = req.body;
    const productAdd = await addProductService(product);
    try {
        await productAdd.save();
        res.json({ status: 'success', payload: productAdd });
    } catch (err) {
        console.error('Error al guardar el producto:', err);
        res.status(500).json({ status: 'error', error: 'No se pudo agregar el producto' });
    }
}

export const updateProductController = async (req, res) => {
    const id = req.params.pid;
    const productUpdates = req.body;

    try {
        const updatedProduct = await updateProductService(id, productUpdates)

        if (updatedProduct) {
            res.json({ status: 'success', payload: updatedProduct });
        } else {
            res.status(404).json({ status: 'error', error: 'No se encontró el producto' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: 'error', error: 'Error en la actualización del producto' });
    }
}

export const deleteProductController = async( req, res ) => {
    const id = req.params.pid;

    try {
        const deletProduct = await deleteProductService(id)

        if (deletProduct) {
            res.json({ status: 'success', payload: deletProduct });
        } else {
            res.status(404).json({ status: 'error', error: 'No se encontró el producto' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: 'error', error: 'Error en la actualización del producto' });
    }

}