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
