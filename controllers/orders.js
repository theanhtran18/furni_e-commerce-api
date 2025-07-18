import mongoose from "mongoose";
import Order from "../models/orders.js";

export const placeOrder = async (req, res) => {
  try {
    const data = req.body;
    const order = await Order.create(data);
    if (order) {
      res.status(200).json("Place Order Success!!");
    }
  } catch (error) {
    res.json({ error });
  }
};

export const getAllOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const orders = await Order.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "product.productId",
          foreignField: "_id",
          as: "productDetail",
        },
      },
      { $unwind: "$productDetail" },
      {
        $lookup: {
          from: "suppliers",
          localField: "product.productId",
          foreignField: "product",
          as: "supplierDetail",
        },
      },
      { $unwind: "$supplierDetail" },
      {
        $lookup: {
          from: "users",
          localField: "supplierDetail.seller",
          foreignField: "_id",
          as: "sellerDetail",
        },
      },
      { $unwind: "$sellerDetail" },
      {
        $project: {
          orderId: "$_id",
          userId: 1,
          shippingAddress: 1,
          status: 1,
          paymentMethod: 1,
          note: 1,
          quantity: "$product.quantity",
          product: "$productDetail",
          seller: {
            _id: "$sellerDetail._id",
            name: "$sellerDetail.givenName",
          },
          totalPrice: {
            $multiply: ["$productDetail.price", "$product.quantity"],
          },
          updatedAt: 1,
        },
      },
    ]);

    res.json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateOrder = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  const order = await Order.findById(id);
  if (!order) {
    return res.json("Order not found!");
  }
  order.status = status;
  await order.save();
  res.json(status);
};
