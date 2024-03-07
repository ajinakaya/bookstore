
const Order = require('../models/ordermodel');


const createOrder = async (req, res) => {
  try {
    const { bookName,totalPrice , deliveryOption, paymentOption, shippingOption, region, fullName, address, city, phone, orderTotal ,status,} = req.body;

    const newOrder = new Order({
      bookName,
      totalPrice,
      deliveryOption,
      paymentOption,
      shippingOption,
      region,
      fullName,
      address,
      city,
      phone,
      orderTotal,
      status,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updatePaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { paymentStatus } = req.body;
    const updatedCheckout = await CheckoutModel.findByIdAndUpdate(
      orderId,
      { paymentStatus },
      { new: true } 
    );

    if (!updatedCheckout) {
      return res.status(404).json({ error: 'Checkout not found' });
    }

    res.json(updatedCheckout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUserorder = async (req, res) => {
  try {
    const { userId } = req.params;

    const userorder= await orderModel.find({ user: userId });

    res.json( userorder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updatePaymentStatus,
  getUserorder
};
