import { Schema, model } from "mongoose";

const OrderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    listProduct: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],

    status: {
      type: String,
      enum: ["pending", "shipping", "delivered", "cancelled"],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "MOMO", "VNPAY", "PAYPAL"],
      required: true,
    },

    note: {
      type: String,
    },
  },
  { timestamps: true }
);

const Order = model("Order", OrderSchema);

export default Order;
