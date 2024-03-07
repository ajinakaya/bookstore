import React, { createContext, useContext, useReducer ,useEffect} from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';



const CartContext = createContext();

const initialState = {
  cart: [],
  totalQuantity: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        cart: action.payload,
        totalQuantity: calculateTotalQuantity(action.payload),
      };
   
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload],
        totalQuantity: state.totalQuantity + 1,
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload),
        totalQuantity: state.totalQuantity - 1,
      };
    case 'UPDATE_CART_ITEM_QUANTITY':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item._id === action.payload.bookId
            ? { ...item, quantity: action.payload.newQuantity }
            : item
        ),
        totalQuantity: calculateTotalQuantity(state.cart, action.payload.newQuantity),
      };
      
    default:
      return state;
  }
};

const calculateTotalQuantity = (cart, updatedQuantity) => {
  return cart.reduce((total, item) => total + (item.quantity || updatedQuantity), 0);
};

const loadCartFromStorage = () => {
  const cartData = localStorage.getItem('cart');
  return cartData ? JSON.parse(cartData) : initialState;
};

const saveCartToStorage = (cartState) => {
  localStorage.setItem('cart', JSON.stringify(cartState));
};

const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartState, dispatch] = useReducer(cartReducer, initialState, loadCartFromStorage);
  



  useEffect(() => {
  if (user) {
    saveCartToStorage(cartState);
  }
}, [cartState, user]);

  const addToCart = async (bookId, quantity) => {
    try {
      if (!user) {
        console.error('User is not authenticated. Cannot add item to the cart.');
        return;
      }
  
      const response = await axios.post(
        '/add-to-cart',
        { userId: user._id, bookId, quantity },
        {
          headers: {
            Authorization: `Bearer ${user.authToken}`,
          },
        }
      );
  
      if (response.status === 200) {
        dispatch({ type: 'ADD_TO_CART', payload: bookId });
        console.log('Item added to the cart successfully');
        
      } else {
        console.error('Failed to add item to the cart:', response.data.error || response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while adding item to the cart:', error.message || error);
    }
  };
  

  const removeFromCart = async (bookId) => {
    try {
      if (user) {
        const response = await axios.delete('/remove-from-cart', {
          headers: {
            'Authorization': `Bearer ${user.authToken}`
          },
          data: { userId: user._id, bookId },
        });

        if (response.status === 200) {
          dispatch({ type: 'REMOVE_FROM_CART', payload: bookId });
        } else {
          console.error('Failed to remove item from the cart');
        }
      } else {
        console.error('User is not authenticated. Cannot remove item from the cart.');
      }
    } catch (error) {
      console.error('An error occurred while removing item from the cart', error);
    }
  };

  const updateCartItemQuantity = async (bookId, newQuantity) => {
    try {
      if (user) {
        const response = await axios.put('/update-quantity', { userId: user._id, bookId, quantity: newQuantity }, {
          headers: {
            'Authorization': `Bearer ${user.authToken}`
          }
        });

        if (response.status === 200) {
          dispatch({
            type: 'UPDATE_CART_ITEM_QUANTITY',
            payload: { bookId, newQuantity },
          });
        } else {
          console.error('Failed to update item quantity in the cart');
        }
      } else {
        console.error('User is not authenticated. Cannot update item quantity in the cart.');
      }
    } catch (error) {
      console.error('An error occurred while updating item quantity in the cart', error);
    }
  };

  return (
    <CartContext.Provider
      value={{ ...cartState,addToCart, removeFromCart, updateCartItemQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };
