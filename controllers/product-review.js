import ProductReview from "../models/product-review.js";

export const addProductReview = async (req, res) => {
  const { product, comment } = req.body;
  const user = req.user.userId;
  const rating = Number(req.body.rating);

  const productReview = await ProductReview.create({
    product,
    user,
    rating,
    comment,
  });
  if (!productReview) {
    return res.json({ status: false });
  }
  res.json({ status: true });
};

export const getAllProductReviewByProductId = async (req, res) => {
  const { id } = req.params;
  const productReviews = await ProductReview.find({ product: id });
  if (productReviews) {
    return res.json(productReviews);
  }
  return res.json("Not Product Review!");
};

export const updateProductReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const productReview = await ProductReview.findById(id);
    if (!productReview) {
      return res.status(404).json({ message: "Product Review not found!" });
    }

    if (rating !== undefined) productReview.rating = rating;
    if (comment !== undefined) productReview.comment = comment;

    await productReview.save();
    res.json({ message: "Updated Product Review!", productReview });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteProductReviewById = async (req, res) => {
  const { id } = req.params;
  const result = await ProductReview.findByIdAndDelete(id);
  if (result) {
    return res.json("Delete Product Review Successfully!");
  }
  return res.json("Cannot Delete Product Review!");
};
