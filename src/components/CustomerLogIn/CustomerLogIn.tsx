import React, { useState } from 'react';
import './CustomerLogIn.css';
import { useNavigate } from 'react-router';
import {
  CustomerDashboardProps,
  Customer,
  CustomerLoginProps,
} from '../../types';

const CustomerLogIn = ({
  allCustomers,
  setIsVendor,
  setCurrentUserId,
}: CustomerLoginProps) => {
  const navigate = useNavigate();

  function handleGoBack() {
    navigate('/');
  }

  function handleSignUp() {
    navigate('/customersignup');
  }

  function handleLogin(e: any) {
    e.preventDefault();
    const validCustomer = allCustomers.find(
      customer =>
        customer.email === customerLoginEmail &&
        customer.password === customerLoginPassword
    );

    if (validCustomer) {
      setIsVendor(false);
      setCurrentUserId(validCustomer.id);
      navigate(`/customerdashboard/${validCustomer.id}`);
      setMessage('');
    } else {
      setMessage(
        'Oops! Check your email and password. Or sign up for an account.'
      );
      setTimeout(() => {
        setMessage('');
      }, 3500);
    }
  }

  const [customerLoginEmail, setCustomerLoginEmail] = useState('');
  const [customerLoginPassword, setCustomerLoginPassword] = useState('');
  const [message, setMessage] = useState('');

  return (
    <form className="customer-login-container">
      <h2 className="customer-login-header">MARKET NEXT DOOR</h2>
      <h3 className="customer-login-subtext">CUSTOMER LOGIN</h3>
      <input
        className="customer-login-input"
        type="text"
        name="customerEmail"
        placeholder="Enter email..."
        value={customerLoginEmail}
        onChange={e => setCustomerLoginEmail(e.target.value)}
      />
      <input
        className="customer-login-input"
        type="text"
        name="customerPassword"
        placeholder="Enter password..."
        value={customerLoginPassword}
        onChange={e => setCustomerLoginPassword(e.target.value)}
      />{' '}
      <p className="message" style={{ fontSize: '1.4rem' }}>
        {message}{' '}
      </p>
      <button
        className="customer-login-submit-btn"
        onClick={e => handleLogin(e)}
      >
        SIGN IN
      </button>
      <p className="customer-login-text">OR</p>
      <button className="customer-login-submit-btn" onClick={handleSignUp}>
        SIGN UP
      </button>
      <button className="customer-login-go-back-btn" onClick={handleGoBack}>
        Go Back
      </button>
    </form>
  );
};

export default CustomerLogIn;
