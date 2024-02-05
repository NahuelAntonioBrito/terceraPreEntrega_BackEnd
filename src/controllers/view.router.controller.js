import { PORT } from '../app.js';
import { ProductService } from '../services/repositories/index.js'
import { getProductFromCart } from '../controllers/carts.controller.js';
import logger from '../logger.js';

export const viewProductsController = async (req, res) => {
    const result = await ProductService.getAllPaginatedProducts( req );
    if(result.statuscode ===  200){
        const totalPages = []
        let link 
        for (let i = 1; i <= result.response.totalPages; i++){
            if(!req.query.page){
                link = `http://${req.hostname}:${PORT}${req.originalUrl}&page=${i}`
            } else {
                const modifiedUrl = req.originalUrl.replace(`page=${req.query.page}`, `page=${i}`)
                link = `http://${req.hostname}:${PORT}${modifiedUrl}`
            }
            totalPages.push( {page: i, link})
        }
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

        const user = req.user.user;
        const cartId = req.user.user.cart
        console.log(cartId)

        res.render('home',{ user,
            cartId,
            products: result.response.payload,
            paginateInfo: {
                hasPrevPage: result.response.hasPrevPage,
                hasNextPage: result.response.hasNextPage,
                prevLink: result.response.prevLink,
                nextLink: result.response.nextLink,
                totalPages,
                page: totalPages, 
                link: fullUrl 
            }
        })
    }else{
        logger.error("viewProducts: ", result.response.error);
        res.status(result.statuscode).json({status: 'error', error: result.response.error})
    }
}

export const realTimeProductsController = async (req, res) => {

    try {
        const result = await ProductService.getAllProducts( );
        res.render('realTimeProducts', { products: result })
    } catch (err) {
        logger.error("realTimeProducts: ", result.response.error);
        res.status(result.statuscode).json({status: 'error', error: result.response.error})
    }

}

export const viewCartController = async (req, res) => {
    console.log("se consulto cart");
    const result = await getProductFromCart(req, res);
    console.log(result);
    if (result && result.response.status === 'success') {
        const { payload: { products } } = result.response;

        const simplifiedProducts = products.map(p => ({ ...p.product.toObject(), quantity: p.quantity }));

        // Calcular el total del monto
        const totalAmount = simplifiedProducts.reduce((total, product) => {
            return total + (product.price * product.quantity);
        }, 0);

        console.log("Total Amount:", totalAmount);

        res.render('productsFromCart', { cart: simplifiedProducts, totalAmount });
    } else {
        logger.error("viewCart: ", result.response.error);
        res.status(result.statusCode).json({ status: 'error', error: result.response.error });
    }
}




