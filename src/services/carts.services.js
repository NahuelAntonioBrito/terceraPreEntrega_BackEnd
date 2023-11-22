import cartModel from '../dao/models/cart.model.js';

export const getProductFromCartServices = async (id) => {
    const result = await cartModel.findById(id).populate('products.product').lean()
    return result
}

export const createCartServices = async () => {
    const cart = await  cartModel.create({});
    return cart
}

export const getCartByIdServices = async (id) => {
    const cart = await cartModel.findById(id);
    return cart
}