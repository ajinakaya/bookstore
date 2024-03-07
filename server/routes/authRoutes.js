const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser, forgotPassword, resetPassword,userById } = require('../controller/authController');
const {getAllBooks,book,getById,updateById,deleteById,searchBooks,reviewSchema,category,authorName,getBooksBySection} =require('../controller/bookController');
const { addToCart, viewCart, removeFromCart, updateCartItemQuantity,calculateTotalCost,processOrder ,clearCart} = require('../controller/shoppingCartController');
const { getWishlist, addToWishlist, removeFromWishlist } = require('../controller/wishListController');
const  {createOrder, getAllOrders,getOrderById}= require('../controller/orderController')


router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);




// Test route
router.get('/', test);

// Authentication routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword', resetPassword);
router.get('/user/:id',userById);

// Book routes
router.post('/upload-book',book)
router.get('/booklisting' ,getAllBooks)
router.get('/booklisting/:id' ,getById)
router.patch('/booklisting/:id',updateById)
router.delete('/booklisting/:id', deleteById)
router.post('/reviews', reviewSchema);
router.get('/book/search', searchBooks);
router.get('/books/:category', category);
router.get('/authorbooks/:authorName', authorName);
router.get('/book/:section', getBooksBySection);


// Cart routes
router.post('/add-to-cart', addToCart);
router.get('/shopping-cart/:userId', viewCart);
router.put('/update-quantity',  updateCartItemQuantity);
router.delete('/remove-from-cart',  removeFromCart);
router.get('/calculate-total-cost',  calculateTotalCost); 
router.post('/process-order',  processOrder);
router.delete('/clear-cart',clearCart);

// Wishlist routes
router.post('/wishlist/add',  addToWishlist);
router.delete('/wishlist/remove',  removeFromWishlist);
router.get('/wishlist', getWishlist);

// order routes
router.post('/checkout',createOrder);
router.get('/checkout-all',getAllOrders);
router.get('checkout/:id', getOrderById);


module.exports = router;
