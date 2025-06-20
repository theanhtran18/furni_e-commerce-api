import { Schema, model } from "mongoose";

const ProductReviewShema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: "users", required: true },
    rating: { type: Number, default: 0 },
    comment: { type: String },
  },
  { timestamps: true }
);

const ProductReview = model("ProductReview", ProductReviewShema);

export default ProductReview;
