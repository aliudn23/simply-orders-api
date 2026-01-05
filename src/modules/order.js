const prisma = require("../prisma/client");

// Order Module

// Create a new order
async function createOrder(req, res) {
  try {
    const { userId, items } = req.body;

    // Validate input
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items array is required" });
    }

    // Calculate total and prepare order items
    let total = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }

      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // Create order with order items
    const order = await prisma.order.create({
      data: {
        userId,
        total,
        orderItems: {
          create: orderItems,
        },
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Get order by ID
async function getOrderById(req, res) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Get order by ID error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Get order by User ID
async function getOrdersByUserId(req, res) {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: parseInt(req.params.userId) },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    res.json(orders);
  } catch (error) {
    console.error("Get orders by User ID error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  createOrder,
  getOrderById,
  getOrdersByUserId,
};