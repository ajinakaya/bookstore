const Wishlist = require('../models/wishlistModel');
const { authenticate } = require('../middleware/authenticate');

const addToWishlist = async (req, res) => {
  try {
    const { userId } = req.body;
    const { bookId } = req.body;

    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }

    if (wishlist.items.some(item => item.bookId.toString() === bookId)) {
      return res.status(400).json({ error: 'Item already in wishlist' });
    }

    wishlist.items.push({ bookId });
    await wishlist.save();

    res.json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { userId } = req.body;
    const { bookId } = req.body;

    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }

    wishlist.items = wishlist.items.filter(item => item.bookId.toString() !== bookId);
    await wishlist.save();

    res.json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }

    res.json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
};
