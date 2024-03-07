const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booklisting',
    required: true,
  },
});

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  items: [wishlistItemSchema],
});

const WishlistModel = mongoose.model('Wishlist', wishlistSchema);

module.exports = WishlistModel;
