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

        const user = req.user;

        res.render('home',{ user,
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

export const viewCartController = async(req, res) => {
    const result = await getProductFromCart(req, res)
    logger.info("viewCart: ", result)
    if( result.statusCode === 200){
        res.render('productsFromCart', { cart: result.response.payload })
    }else{
        logger.error("viewCart: ", result.response.error);
        res.status(result.statusCode).json({status: 'error', error: result.response.error})
    }
}