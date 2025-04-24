import { Schema, model } from "mongoose";

const CartItemSchema = new Schema(
    {
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: {
            type: Number,
            default: 1
        }
    }
)

const CartItem = model("CartItem", CartItemSchema);
export default CartItem;