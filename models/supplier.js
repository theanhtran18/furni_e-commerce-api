import { Schema, model } from "mongoose";

const SupplierSchema = new Schema(
  {
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

const Supplier = model("Supplier", SupplierSchema);

export default Supplier;
