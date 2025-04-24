import ShoppingCart from "../models/shopping-cart.js";

export const getAllCartItem = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "Thiếu userId" });
        }

        const cart = await ShoppingCart.findOne({ userId })
            .populate({
                path: "cartItem",
                populate: {
                    path: "productId"
                }
            });

        if (!cart) {
            return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
        }

        const items = cart.cartItem.map(item => ({
            product: item.productId, // chứa toàn bộ thông tin sản phẩm
            quantity: item.quantity
        }));

        res.status(200).json({ items });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi server" });
    }
};
