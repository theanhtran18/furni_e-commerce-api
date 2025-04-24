import ShoppingCart from "../models/shopping-cart.js";
import Product from "../models/product.js";
import { createShoppingCart } from "../services/shopping-cart.js";
import CartItem from "../models/cart-item.js";

export const addProductToCart = async (req, res) => {
    try {
        const { userId, productId, quantity = 1 } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({ message: "userId và productId là bắt buộc" });
        }

        // Kiểm tra sản phẩm có tồn tại không
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
        }

        // Tìm giỏ hàng của người dùng
        let cart = await ShoppingCart.findOne({ userId });

        if (!cart) {
            // Nếu chưa có giỏ hàng, tạo mới
            cart = await createShoppingCart(userId)
        }
        await cart.populate("cartItem");
        // Kiểm tra xem sản phẩm đã có trong giỏ chưa
        const existingItem = cart.cartItem.find(item =>
            item.productId && item.productId.toString() === productId
        );


        if (existingItem) {
            // Nếu có, tăng số lượng
            existingItem.quantity += quantity;
            await existingItem.save();
        } else {
            // Nếu chưa có, thêm sản phẩm mới vào
            const newItem = await CartItem.create({ productId, quantity });
            cart.cartItem.push(newItem._id);
        }

        await cart.save();


        res.status(200).json({ message: "Đã thêm vào giỏ hàng", cart });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi server" });
    }
};

export const removeProductInCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({ message: "userId and productId are required." });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        const cart = await ShoppingCart.findOne({ userId }).populate("cartItem");
        if (!cart || !cart.cartItem) {
            return res.status(404).json({ message: "Shopping cart not found." });
        }

        const existingItem = cart.cartItem.find(item =>
            item.productId && item.productId.toString() === productId
        );

        if (!existingItem) {
            return res.status(404).json({ message: "Product is not in the cart." });
        }

        await existingItem.deleteOne();
        await cart.save();

        res.status(200).json({ message: "Product removed from cart successfully.", cart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error." });
    }
};
