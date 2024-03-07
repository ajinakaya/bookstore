import React, { createContext, useContext, useReducer } from "react";
 
const WishlistContext = createContext();
 
const WishlistProvider = ({ children }) => {
  const [wishlist, dispatch] = useReducer(wishlistReducer, []);
 
  const addToWishlist = (book) => {
    dispatch({ type: "ADD_TO_WISHLIST", payload: book });
  };
 
  const removeFromWishlist = (bookId) => {
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: bookId });
  };
 
  const isBookInWishlist = (book) => {
    return wishlist.some((item) => item._id === book._id);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist ,isBookInWishlist}}>
      {children}
    </WishlistContext.Provider>
  );
};
 
 const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
 
  const wishlistReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_WISHLIST":
        return [...state, action.payload];
      case "REMOVE_FROM_WISHLIST":
        return state.filter((item) => item._id !== action.payload);
      default:
        return state;
    }
  };
 
export { WishlistProvider, useWishlist };
 
