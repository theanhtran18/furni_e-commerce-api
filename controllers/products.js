import Product from "../models/product.js";
import Supplier from "../models/supplier.js";

export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.json("Error: ", error);
  }
};

export const addProduct = async (req, res) => {
  const userId = req.user.userId;
  const { productName, price, image } = req.body;
  const product = await Product.create({ productName, price, image });
  if (product) {
    const supplier = await Supplier.create({
      seller: userId,
      product: product._id,
    });
    if (supplier) res.json("Add product success!");
    else res.json("Error");
  } else res.json("Error");
};
