import { Router } from "express";
import {
  addProductReview,
  deleteProductReviewById,
  getAllProductReviewByProductId,
  updateProductReviewById,
} from "../controllers/product-review.js";

const productReviewRouter = Router();

productReviewRouter.get(
  "/products/:id/reviews',",
  getAllProductReviewByProductId
);
productReviewRouter.post("/review/add", addProductReview);
productReviewRouter.delete("/review/:id", deleteProductReviewById);
productReviewRouter.patch("/review/:id", updateProductReviewById);

export default productReviewRouter;
