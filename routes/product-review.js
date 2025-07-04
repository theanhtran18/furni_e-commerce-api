import { Router } from "express";
import {
  addProductReview,
  deleteProductReviewById,
  getAllProductReviewByProductId,
  updateProductReviewById,
} from "../controllers/product-review.js";
import { verifyAccessToken } from "../middlewares/auth.js";

const productReviewRouter = Router();

productReviewRouter.get(
  "/products/:id/reviews',",
  getAllProductReviewByProductId
);
productReviewRouter.post("/reviews/add", verifyAccessToken, addProductReview);
productReviewRouter.delete(
  "/reviews/:id",
  verifyAccessToken,
  deleteProductReviewById
);
productReviewRouter.patch(
  "/reviews/:id",
  verifyAccessToken,
  updateProductReviewById
);

export default productReviewRouter;
