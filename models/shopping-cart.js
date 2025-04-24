import { Schema, model } from "mongoose";

const ShoppingCartSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        cartItem: [{ type: Schema.Types.ObjectId, ref: "CartItem" }]
    }
)

const ShoppingCart = model("ShoppingCart", ShoppingCartSchema);
export default ShoppingCart