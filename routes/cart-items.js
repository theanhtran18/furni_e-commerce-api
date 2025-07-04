import { Router } from "express";
import {
  addProductToCart,
  removeProductInCart,
} from "../controllers/cart-items.js";
import { verifyAccessToken } from "../middlewares/auth.js";

const cartItemRouter = Router();

cartItemRouter.post("/cartItems", verifyAccessToken, addProductToCart);
cartItemRouter.delete("/cartItems/:id", verifyAccessToken, removeProductInCart);
export default cartItemRouter;
