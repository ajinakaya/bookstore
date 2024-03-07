const mongoose = require('mongoose');

const shoppingCartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference of ` user model
        required: true,
    },
    items: [
        {
            book: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Booklisting', // Reference of Booklisting model
                required: true,
            },
            
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
        }
    ],
    
});

const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);

module.exports = ShoppingCart;
