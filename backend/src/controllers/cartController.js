import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// 📌 Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userId; // Get user from auth middleware

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(401).json({ message: "Cart not found" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(402).json({ message: "Product not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // Product already in cart, update quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Add new product to cart
      cart.items.push({ product: productId, quantity });
    }

    // Calculate total price
    cart = await cart.populate("items.product");
    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.quantity * item.product.newPrice,
      0
    );

    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 Get User Cart
export const getCart = async (req, res) => {
  try {
    const userId = req.userId;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      return res.status(408).json({ message: "Cart is empty" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 Update Cart Item Quantity
export const updateCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const userId = req.userId;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (!item) return res.status(404).json({ message: "Product not in cart" });

    item.quantity = quantity;

    cart = await cart.populate("items.product");
    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.quantity * item.product.newPrice,
      0
    );

    await cart.save();
    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 Remove Item from Cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;
    let cart = await Cart.findOne({ user: userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1)
      return res.status(404).json({ message: "Product not in cart" });

    if (cart.items[itemIndex].quantity > 1) {
      // Decrease quantity by 1
      cart.items[itemIndex].quantity -= 1;
    } else {
      // If quantity is 1, remove the item completely
      cart.items.splice(itemIndex, 1);
    }
    // Recalculate total price
    cart = await cart.populate("items.product");
    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.quantity * item.product.newPrice,
      0
    );

    await cart.save();
    res.status(200).json({ message: "Item quantity updated", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
