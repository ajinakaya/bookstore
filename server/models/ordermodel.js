const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
 
  bookName: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  deliveryOption: {
    type: String,
    required: true,
  },
  paymentOption: {
    type: String,
    required: true,
  },
  shippingOption: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
});

const orderModel = mongoose.model('Order', orderSchema);

module.exports = orderModel;
