import { Router } from "express";
import { getAllProduct, addProduct } from "../controllers/products.js";
import {
  checkAdminPermission,
  verifyAccessToken,
} from "../middlewares/auth.js";

const productRouter = Router();

productRouter.get("/products", getAllProduct);
productRouter.post(
  "/products",
  verifyAccessToken,
  checkAdminPermission,
  addProduct
);

export default productRouter;
