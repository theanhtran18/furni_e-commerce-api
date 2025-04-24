import ShoppingCart from "../models/shopping-cart.js";

export const createShoppingCart = async (userId) => {
    try {
        const existingCart = await ShoppingCart.findOne({ userId });
        if (existingCart) return existingCart;

        const newCart = await ShoppingCart.create({ userId, cartItem: [] });
        return newCart;
    } catch (error) {
        console.log("Error create Shopping Cart!", error);
        throw error;
    }
};
