import { Router } from "express";
import { placeOrder, getAllOrder, updateOrder } from "../controllers/orders.js";

const orderRouter = Router();

orderRouter.post("/order/place-order", placeOrder);
//orderRouter.delete("/order/delete", removeProductInCart)
orderRouter.post("/order/getAllOrder", getAllOrder);
orderRouter.post("/order/update", updateOrder);
export default orderRouter;
