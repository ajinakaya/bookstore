import './Checkout.css';
import React from 'react';


function LeftCheckout({ imageURL, bookName, totalPrice, calculateShippingCost, calculateTotalCost }) {
  return (
    <div className='checkout_left'>
      <div className='bookDetail_checkout'>
        <div className="checkout-image">
          <img src={imageURL} alt={`Book cover for ${bookName}`} className="checkoutbookimage" />
        </div>
        <div className="checkout-info">
          <h2 className='checkoutbookname'> {bookName}</h2>
          <h2 className='checkoutsubtotal'>Subtotal: Rs {totalPrice}</h2>
          <h2 className='checkoutshippingcost'>Shipping: {calculateShippingCost() === 0 ? 'Free' : `Rs ${calculateShippingCost()}`}</h2>
          <h2 className='checkouttotal'>Total: Rs {calculateTotalCost()}</h2>
        </div>
      </div>
    </div>
  );
}

export default LeftCheckout;



// import React from 'react';
// import './Checkout.css';

// function LeftCheckout({ cart, totalPrice, calculateShippingCost, calculateTotalCost }) {
//   return (
//     <div className='checkout_left'>
//       {Array.isArray(cart) && cart.map((item) => (
//         <div key={item} className='bookDetail_checkout'>
//           <div className="checkout-image">
//             <img src={item.imageURL} alt={`Book cover for ${item.bookTitle}`} className="checkoutbookimage" />
//           </div>
//           <div className="checkout-info">
//             <h2 className='checkoutbookname'>Book Name: {item.boolTitle}</h2>
//             <h2 className='checkoutsubtotal'>Subtotal: Rs {totalPrice}</h2>
//             <h2 className='checkoutshippingcost'>Shipping: {calculateShippingCost() === 0 ? 'Free' : `Rs ${calculateShippingCost()}`}</h2>
//             <h2 className='checkouttotal'>Total: Rs {calculateTotalCost()}</h2>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default LeftCheckout;





