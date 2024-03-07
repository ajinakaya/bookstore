import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";
import { FaMinus, FaPlus } from "react-icons/fa";
import "../css/ShoppingCart.css";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useCheckout } from './CheckoutContext';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { cart, totalQuantity, removeFromCart, updateCartItemQuantity, loading, error } = useCart();
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const { setCheckoutData } = useCheckout();

 

  if (!user) {
    return <p>Please log in to view your shopping cart.</p>;
  }

  const handleRemoveFromCart = (bookId) => {
    removeFromCart(bookId);
  };

  const handleIncrement = (book) => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    updateCartItemQuantity(book, quantity + 1);
  };
  
  const handleDecrement = (book) => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      updateCartItemQuantity(book, quantity - 1);
    }
  };
  const handleCheckout = (book) => {
    const  imageURL =  book.imageURL
    const bookName = book.bookTitle ; 
    const totalPrice =  cart.reduce((acc, book) => acc + book.price * book.quantity, 0);

  
    console.log('Checkout Data:', {imageURL, bookName, totalPrice });
    setCheckoutData(imageURL,bookName, totalPrice);

   
    navigate('/checkout');
  };

  const totalPrice = cart.reduce((acc, book) => acc + book.price * book.quantity, 0);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error in ShoppingCart component:", error);
    return <p>Error: {error.message}</p>;
  }

  if (!cart || cart.length === 0) {
    return <p>Your shopping cart is empty.</p>;
  }

  return (
   
    <div className="Shoppingcontainer">
      <h2>Your Shopping Cart</h2>
 
     
      <div className="header-row">
        <p className="productname">Product</p>
        <p className="shoppingQuantity">Quantity</p>
        <p className="Shoppingtotal">Total</p>
      </div>
      
 
      <div className="shopping-wrapper">
        {cart.map((book) => (
          <div key={book._id} className="cart-item">
            <div className="shopping book-image">
             <img src={book.imageURL} alt=" " className="shoppingbookimage__img" />
             </div>
             
             <div className="shoppingbook-info">
            <h2 className="shoppingbook-title">{book.bookTitle}</h2>
            <p className="shoppingbook-price"> Rs {book.price}</p>
          
            
            <div className="QuantityPrice">
              <div className="Quantity">
                <span className="Addsub" onClick={() => handleDecrement(book._id)}>
                  <FaMinus />
                </span>
                
                <h6 className="QuantityText"> {book.quantity}</h6>
                <span className="Addsub" onClick={() => handleIncrement(book._id)}>
                  <FaPlus />
                </span>
                                                                                                                  
              </div>
            </div>
           
            <p className="shoppingtotal"> Rs {book.price * book.quantity}</p>
            <MdDeleteOutline onClick={() => handleRemoveFromCart(book._id)} className="delete-icon" />
            
          </div>
          </div>
         
        ))}   
          </div>
          <div className="total-section">
           <p className="estimatedtotal">Estimated total : Rs {totalPrice}</p>
           <p className="totalshoppingq">Total Quantity: {totalQuantity}</p>
           <button className="checkout-button" onClick={() => handleCheckout(cart[0])}>
           Checkout
          </button>
         </div>
      </div>
    
  );
};

export default ShoppingCart;


