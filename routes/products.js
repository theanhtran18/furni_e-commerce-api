import { Router } from "express";
import { addProduct, getProducts } from "../controllers/products.js";
import {
  checkAdminPermission,
  verifyAccessToken,
} from "../middlewares/auth.js";

const productRouter = Router();

productRouter.get("/products", getProducts);

productRouter.post(
  "/products",
  verifyAccessToken,
  checkAdminPermission,
  addProduct
);

export default productRouter;
