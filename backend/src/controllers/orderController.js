import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

// 📌 Checkout (Create Order)
export const checkout = async (req, res) => {
  try {
    const userId = req.userId;
    const cart = await Cart.findOne({ user: userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Step 1: Fetch all product details
    const productIds = cart.items.map((item) => item.product);
    const products = await Product.find({ _id: { $in: productIds } }).populate(
      "shopId"
    );

    // Step 2: Group products by shop
    const groupedOrders = {};
    products.forEach((product) => {
      const shopId = product.shopId._id;
      if (!groupedOrders[shopId]) {
        groupedOrders[shopId] = {
          shopId,
          pickUpLocation: product.shopId.location,
          items: [],
          totalPrice: 0,
        };
      }

      // Find the matching cart item
      const cartItem = cart.items.find(
        (item) => item.product.toString() === product._id.toString()
      );
      if (cartItem) {
        groupedOrders[shopId].items.push({
          product: product._id,
          quantity: cartItem.quantity,
        });
        groupedOrders[shopId].totalPrice +=
          product.newPrice * cartItem.quantity;
      }
    });

    // Step 3: Create a single Parent Order
    const subOrders = Object.values(groupedOrders); // Convert grouped data into an array

    const mainOrder = new Order({
      user: userId,
      subOrders, // Stores each shop’s order details
      totalPrice: subOrders.reduce(
        (total, order) => total + order.totalPrice,
        0
      ),
      status: "Pending",
    });

    await mainOrder.save();

    // Step 4: Clear the cart

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    // Step 5: Save the order in User’s order history
    const user = await User.findById({ _id: userId });
    user.orders.push({ orderId: mainOrder._id, purchasedDate: Date.now() });
    await user.save();

    res
      .status(201)
      .json({ message: "Order created successfully", order: mainOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating order" });
  }
};

// 📌 Get User Orders
export const getOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ user: userId }).populate(
      "subOrders.items"
    );

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 Get Order by ID
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.userId;
    const order = await Order.findOne({ _id: orderId, user: userId }).populate(
      "subOrders.items"
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 Cancel Order
export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.userId;
    const order = await Order.findOne({ _id: orderId, user: userId });

    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = "Cancelled";
    await order.save();

    res.status(200).json({ message: "Order cancelled", order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
