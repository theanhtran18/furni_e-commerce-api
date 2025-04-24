import { Router } from 'express'
import { getAllCartItem } from '../controllers/shopping-carts.js'

const cartRouter = Router()

cartRouter.get("/cart/:userId", getAllCartItem)

export default cartRouter