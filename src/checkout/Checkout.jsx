import React, { useState, useEffect } from 'react';
import './Checkout.css';
import LeftCheckout from './LeftCheckout';
import Payment from './Payment';

import { MdOutlineLocalShipping } from 'react-icons/md';
import { RiHomeHeartFill } from 'react-icons/ri';
import { useCheckout } from '../components/CheckoutContext';
import axios from 'axios'; 

function Checkout() {
  const [showPayment, setShowPayment] = useState(

  );
  const { checkoutInfo } = useCheckout();
  const {imageURL, bookName, totalPrice } = checkoutInfo;
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(
    localStorage.getItem('selectedDeliveryOption') || 'ship'
  );
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(
    localStorage.getItem('selectedPaymentOption') || 'COD'
  );
  const [selectedShippingOption, setSelectedShippingOption] = useState(
    localStorage.getItem('selectedShippingOption') || 'address'
  );
  const [selectedRegion, setSelectedRegion] = useState(
    localStorage.getItem('selectedRegion') || 'Koshi'
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({ 
    email: '',
    FullName: '',
    Address: '',
    City: '',
    Phone: '',
  });


  useEffect(() => {
    // Save selected options to localStorage whenever they change
    localStorage.setItem('selectedDeliveryOption', selectedDeliveryOption);
    localStorage.setItem('selectedPaymentOption', selectedPaymentOption);
    localStorage.setItem('selectedShippingOption', selectedShippingOption);
    localStorage.setItem('selectedRegion', selectedRegion);
  }, [selectedDeliveryOption, selectedPaymentOption, selectedShippingOption, selectedRegion]);

  const handleDeliveryOptionChange = (option) => {
    setSelectedDeliveryOption(option);
  };

  const handlePaymentOptionChange = (option) => {
    setSelectedPaymentOption(option);
  };

  const handleShippingOptionChange = (option) => {
    setSelectedShippingOption(option);
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
  };
  const calculateShippingCost = () => {
        if (selectedDeliveryOption === 'ship') {
          switch (selectedShippingOption) {
            case 'address':
              return 120;
            case 'others':
              return 220;
            case 'instant':
              return 290;
            default:
              return 0;
          }
        } else if (selectedDeliveryOption === 'pickup') {
          // Shipping is free for pickup
          return 0;
        }
    
        // Default case
        return 0;
      };
    
      const calculateTotalCost = () => {
        const shippingCost = calculateShippingCost();
        return Number(totalPrice) + shippingCost;
      };

      const handleCompleteOrder = async () => {
        try {
          setLoading(true);
         
          const orderData = {
            bookName,
            totalPrice,
            deliveryOption: selectedDeliveryOption,
            paymentOption: selectedPaymentOption,
            shippingOption: selectedShippingOption,
            region: selectedRegion,
            fullName: data.FullName,
            address: data.Address,
            city: data.City,
            phone: data.Phone,
            orderTotal: calculateTotalCost(), 
          };
    
          const response = await axios.post("/checkout", orderData);
      console.log("Order response:", response.data);
      setShowPayment(true);

    } catch (error) {
      console.error('Error placing order:', error.response.data);
      setError('Error placing order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

        
  return (
    <>

    <div className='checkout_mainContainer'>
    <LeftCheckout
          imageURL={imageURL}
          bookName={bookName}
          totalPrice={totalPrice}
          calculateShippingCost={calculateShippingCost}
          calculateTotalCost={calculateTotalCost}
        />
         {showPayment ? (
        <Payment 
        contactInfo={{ email: data.email }}  // Pass contact details
        shippingInfo={{
          fullName: data.FullName,
          address: data.Address,
          city: data.City,
          region:selectedRegion,
          phone: data.Phone,
          orderTotal: calculateTotalCost(), 
        }}  
      />
      ) : (
     <div className='checkout_right'>
          <div className='contact_section'>
            <h2>Contact</h2>
          </div>
          <div className='inputbox_checkout'>
            <input
              type="email"
              value={data.email}
              onChange={(e)=> setData({...data,email:e.target.value})}
              required
            />
            <label>Email</label>
          </div>
          <div className='contact_section'>
            <h2>Delivery</h2>
          </div>
          <div className='optionbox_checkout'>
            <div className='delivery_option'>
              <input
                type="radio"
                checked={selectedDeliveryOption === 'ship'}
                onChange={() => handleDeliveryOptionChange('ship')}
              />
              <label> Ship <MdOutlineLocalShipping /></label>
            </div>
            <div className='delivery_option'>
              <input
                type="radio"
                checked={selectedDeliveryOption === 'pickup'}
                onChange={() => handleDeliveryOptionChange('pickup')}
              />
              <label>Pick up <RiHomeHeartFill /></label>
            </div>
          </div>

          {selectedDeliveryOption === 'pickup' && (
            <div className='message'>Currently not available</div>
          )}

          {selectedDeliveryOption === 'ship' && (
            <>
              <div className='inputbox_checkout'>
                <select
                  value={selectedRegion}
                  onChange={(e) => handleRegionChange(e.target.value)}
                  required
                >
                  <option value="Koshi">Koshi</option>
                  <option value="Madhesh">Madhesh</option>
                  <option value="Bagmati">Bagmati</option>
                  <option value="Gandaki">Gandaki</option>
                  <option value="Lumbini">Lumbini</option>
                  <option value="Karnali">Karnali</option>
                  <option value="Sudurpashchim">Sudurpashchim</option>
                </select>
                <label>Provision</label>
              </div>
              <div className="form-container">
                <div className='inputbox_checkout'>
                  <input
                    type="FullName"
                    value={data.FullName}
                    onChange={(e)=> setData({...data,FullName:e.target.value})}
                    required
                  />
                  <label>Full Name</label>
                </div>
              </div>
              <div className='inputbox_checkout'>
                <input
                  type="Address"
                  value={data.Address}
                  onChange={(e)=> setData({...data,Address:e.target.value})}
                  required
                />
                <label>Address</label>
              </div>
              <div className="form-container">
                <div className='inputbox_checkout'>
                  <input
                    type="City"
                    value={data.City}
                    onChange={(e)=> setData({...data,City:e.target.value})}
                    required
                  />
                  <label>City</label>
                </div>
                <div className='inputbox_checkout'>
                  <input
                    type="Phone"
                    value={data.Phone}
                    onChange={(e)=> setData({...data,Phone:e.target.value})}
                    required
                  />
                  <label>Phone</label>
                </div>
              </div>
              <div className='contact_section'>
                <h5>Shipping method</h5>
              </div>
              <div className='optionbox_checkout'>
                <div className='delivery_option'>
                  <input
                    type="radio"
                    checked={selectedShippingOption === 'address'}
                    onChange={() => handleShippingOptionChange('address')}
                  />
                  <div className="delivery_label">
                    <label> Kathmandu valley</label>
                    <span className="delivery_charge">Rs.120</span>
                  </div>
                </div>
                <div className='delivery_option'>
                  <input
                    type="radio"
                    checked={selectedShippingOption === 'others'}
                    onChange={() => handleShippingOptionChange('others')}
                  />
                  <div className="delivery_label">
                    <label>Other Places</label>
                    <span className="delivery_charge">Rs.220</span>
                  </div>
                </div>
                <div className='delivery_option'>
                  <input
                    type="radio"
                    checked={selectedShippingOption === 'instant'}
                    onChange={() => handleShippingOptionChange('instant')}
                  />
                  <div className="delivery_label">
                    <label>Instant(only inside kathmandu valley)</label>
                    <span className="delivery_charge">Rs.290</span>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className='contact_section'>
            <h2>Payment</h2>
          </div>
          <div className='optionbox_checkout'>
            <div className='delivery_option'>
              <input
                type="radio"
                checked={selectedPaymentOption === 'COD'}
                onChange={() => handlePaymentOptionChange('COD')}
              />
              <label>Cash on delivery (COD)</label>
            </div>
            {selectedPaymentOption === 'COD' && (
              <div className='message'>Make a payment now to ensure faster processing of your deliveries.</div>
            )}
            <div className='delivery_option'>
              <input
                type="radio"
                checked={selectedPaymentOption === 'Pay now'}
                onChange={() => handlePaymentOptionChange('Pay now')}
              />
              <label>Pay now</label>
            </div>
            {selectedPaymentOption === 'Pay now' && (
              <div className='message'>We accept Esewa, FonePay, and Bank Transfer.</div>
            )}
         
    </div>
    <div className='Corder_checkout' onClick={handleCompleteOrder}>
            <p>Complete Order</p>
          </div>
          {showPayment ? <Payment />: null}
        </div>
      )}
    </div>
   
    </>
  );
}

export default Checkout;
