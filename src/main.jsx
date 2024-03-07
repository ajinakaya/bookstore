import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { CartProvider } from './components/CartContext.jsx'
import {WishlistProvider} from './components/WishlistContext.jsx'
import { AuthProvider } from './components/AuthContext';
import { CheckoutProvider } from './components/CheckoutContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
        <CheckoutProvider>
        <App />
        </CheckoutProvider>
    </WishlistProvider>
    </CartProvider>
    </AuthProvider>
     
    </Router>
  
  </React.StrictMode>
)
