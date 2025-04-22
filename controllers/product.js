import Product from "../models/product.js";

export const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (error) {
        res.json("Error: ", error)
    }
}

export const addProduct = async (req, res) => {
    const { productName, price, image } = req.body;
    const product = await Product.create({ productName, price, image })
    if (product) {
        res.json("Add product success!");
    }
    else res.json("Error")
}