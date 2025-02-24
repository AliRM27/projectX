import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// 📌 Checkout (Create Order)
export const checkout = async (req, res) => {
  try {
    const userId = req.userId; // Cart contains product IDs & quantity
    const cart = await Cart.findOne({ user: userId });

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Step 1: Fetch all product details
    const productIds = cart.items.map((item) => item.product);
    const products = await Product.find({ _id: { $in: productIds } }).populate(
      "shopId"
    );
    // Step 2: Group products by shop
    const ordersByShop = {};
    products.forEach((product) => {
      const shopId = product.shopId._id.toString();
      if (!ordersByShop[shopId]) {
        ordersByShop[shopId] = {
          shopId,
          pickUpLocation: product.shopId.location,
          items: [],
          totalPrice: 0,
        };
      }

      // Find the matching cart item for this product
      const cartItem = cart.items.find(
        (item) => item.product.toString() === product._id.toString()
      );
      if (cartItem) {
        ordersByShop[shopId].items.push({
          productId: product._id,
          quantity: cartItem.quantity,
        });
        ordersByShop[shopId].totalPrice += product.newPrice * cartItem.quantity;
      }
    });

    // Step 3: Create separate orders for each shop
    const createdOrders = [];
    for (const shopId in ordersByShop) {
      const orderData = ordersByShop[shopId];
      const newOrder = new Order({
        user: userId,
        shop: orderData.shopId,
        pickUpLocation: orderData.pickUpLocation,
        items: orderData.items,
        totalPrice: orderData.totalPrice,
        status: "Pending",
      });

      await newOrder.save();
      createdOrders.push(newOrder);
    }

    res.status(201).json({
      message: "Orders created successfully",
      orders: createdOrders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating orders" });
  }
};

// 📌 Get User Orders
export const getOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ user: userId }).populate(
      "items.productId"
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
    const order = await Order.findById(orderId).populate("items.productId");

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
    const order = await Order.findById(orderId);

    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = "Cancelled";
    await order.save();

    res.status(200).json({ message: "Order cancelled", order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
