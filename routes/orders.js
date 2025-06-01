import { Router } from "express";
import { placeOrder } from "../controllers/orders.js";

const orderRouter = Router();

orderRouter.post("/order/place-order", placeOrder);
//orderRouter.delete("/order/delete", removeProductInCart)
export default orderRouter;
