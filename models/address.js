import { Schema, model } from "mongoose";

const AddressSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        street: { type: String, required: true },
        ward: { type: String },
        district: { type: String },
        city: { type: String, required: true },
        country: { type: String, default: "Vietnam" },
    }
)

const Address = model("Address", AddressSchema);
export default Address;