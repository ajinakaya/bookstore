import React, { useState } from "react";
import { FaTruck } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import { FaMinus } from "react-icons/fa6";
import { MdAdd } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { useCart } from './CartContext';

const DeliveryLocationDay = ({ book }) => {
  const [quantity, setQuantity] = useState(1);
  const {addToCart} = useCart();

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
 
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
 
  const handleAddToCart = (book,quantity) => {
    addToCart({...book, quantity});
  };

 return (
    <div className="mainDeliveryLocation">
      <h6 className="deliveryTitle">Get Estimated Arrival Time</h6>
      <div className="chooseLocationTime">
        <span className="frontIconDelivery">
          <FaLocationDot />
        </span>
        <div className="deliveryLocation">
          <h6>Kathmandu</h6>
          <p className="locationDescription">Kathmandu, Nepal</p>
        </div>
        <div className="dropdown-icon">
          <button className="dropDownBtn">
            <PiPencilSimpleLineFill />
          </button>
        </div>
      </div>
      <div className="deliveryDayEstimation">
        <span className="frontIconDelivery">
          <FaTruck />
        </span>
        <div className="deliveryLocation">
          <h6>Delivery Within</h6>
          <p>1 to 2 days</p>
        </div>
        <div className="dropdown-icon">
          <span className="backIconDelivery">
            <BsInfoCircle />
          </span>
        </div>
      </div>
      <div className="quantityPrice">
        <h6>Rs.{book.price}</h6>
        <div className="quantity">
          <span className="addSub" onClick={handleDecrement}>
            <FaMinus />
          </span>
          <h6 className="quantityText">QTY: {quantity}</h6>
          <span className="addSub" onClick={handleIncrement}>
          <MdAdd />
          </span>
        </div>
      </div>
          <button onClick={() => handleAddToCart(book,quantity)}className="addToCartDelivery">
        ADD TO CART
      </button>
    </div>
   
  );
};
export default DeliveryLocationDay;

