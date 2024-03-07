import React, { useState } from 'react';
import axios from 'axios';
import'../css/UserResetPassword.css';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    try {
      const response = await axios.post('/resetpassword', {
        email: email,
        newPassword: password,
      });

      if (response.data && response.status === 200) {
        setSuccessMessage('Password updated successfully!');
        setError('');
      } else {
        setError('An error occurred. Please try again.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again.');
      setSuccessMessage('');
    }
    
  };

  return (
    <div className='main-Reset-wrapper'>
    <div className="wrapper">
      <div className="form-box login">
        <h4>Reset Password</h4>
        {error && <div className="alert alert-danger">{error}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <form onSubmit={handleSubmit}>
        <div className="inputbox">
            <input
              type="Email"
              placeholder="Enter Email"
              autoComplete="off"
              name="Email"
              className="form-control rounded-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              
            />
          </div>
          <div className="inputbox">
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="form-control rounded-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn">
            Update
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default ResetPassword;
