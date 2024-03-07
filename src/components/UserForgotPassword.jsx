import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/UserForgotPassword.css';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
const navigate = useNavigate();
const [error, setError] = useState(null);
const [data, setData] = useState({
    email: '',
});

const forgotPassword = async (e) => {
    e.preventDefault();
    const { email } = data;

    try {
    const response = await axios.post('/forgotpassword', {
        email,
    });

    if (response.data.error) {
        // Display error using toast or other notification libraries
        toast.error(response.data.error);
    } else {
        // Redirect to Reset Password page with the email parameter
        navigate(`/Resetpassword/${email}`);
    }
    } catch (error) {
      // Log the error for debugging
    console.error();

      // Set an error message for display
    setError('An error occurred. Please try again.');
    }
};

return (
    
    <div className="main-Forgot-wrapper">
    <div className="wrapper">
    <div className="form-box login">
        <h4>Forgot Password</h4>
        {/* Display error message if there's any */}
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={forgotPassword}>
        <div className="inputbox">
            <input
            type="email"
            placeholder="Enter Email"
            autoComplete="off"
            name="email"
            className="finputbox"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            />
        </div>
        <button type="submit" className="btn ">
            Send
        </button>
        </form>
    </div>
    </div>
    </div>
);
};

export default ForgotPassword;
