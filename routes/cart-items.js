
import { Router } from 'express'
import { addProductToCart, removeProductInCart } from '../controllers/cart-items.js'

const cartItemRouter = Router()

cartItemRouter.post("/cartItem/add", addProductToCart)
cartItemRouter.delete("/cartItem/delete", removeProductInCart)
export default cartItemRouter
