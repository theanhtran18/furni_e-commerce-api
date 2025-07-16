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

export const getProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const [products, totalItems] = await Promise.all([
    Product.find().skip(skip).limit(limit),
    Product.countDocuments(),
  ]);

  const totalPages = Math.ceil(totalItems / limit);

  return res.json({
    page,
    totalPages,
    totalItems,
    products,
  });
};
