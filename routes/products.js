
import { Router } from 'express'
import { getAllProduct, addProduct } from '../controllers/products.js'

const productRouter = Router()

productRouter.get("/product", getAllProduct)
productRouter.post("/product/add", addProduct)

export default productRouter
