import { Router } from "express";
import { placeOrder, getAllOrder, updateOrder } from "../controllers/orders.js";
import {
  checkAdminPermission,
  verifyAccessToken,
} from "../middlewares/auth.js";

const orderRouter = Router();

orderRouter.post("/orders", verifyAccessToken, placeOrder);
//orderRouter.delete("/order/delete", removeProductInCart)
orderRouter.get("/orders", verifyAccessToken, getAllOrder);
orderRouter.patch(
  "/orders/:id",
  verifyAccessToken,
  checkAdminPermission,
  updateOrder
);
export default orderRouter;
