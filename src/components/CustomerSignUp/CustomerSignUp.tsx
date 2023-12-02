import React, { useState } from "react";
import "./CustomerSignUp.css";

const CustomerSignUp = () => {
  const [customerFirstName, setCustomerFirstName] = useState("");
  const [customerLastName, setCustomerLastName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPassword, setCustomerPassword] = useState("");
  const [customerPasswordMatch, setCustomerPasswordMatch] = useState("");

  const submitCustomer = () => {
    const newCustomer = {
      customerFirstName,
      customerLastName,
      customerPassword,
      customerPasswordMatch,
    };
  };
  return (
    <form className="customer-sign-up-container">
      <h2 className="customer-sign-up-header">MARKET NEXT DOOR</h2>
      <h3 className="customer-sign-up-subtext">CUSTOMER SIGN UP</h3>

      <input
        className="customer-sign-up-input"
        type="text"
        name="firstName"
        placeholder="FIRST NAME..."
        value={customerFirstName}
        onChange={(e) => setCustomerFirstName(e.target.value)}
      />
      <input
        className="customer-sign-up-input"
        type="text"
        name="lastName"
        placeholder="LAST NAME..."
        value={customerLastName}
        onChange={(e) => setCustomerLastName(e.target.value)}
      />
      <input
        className="customer-sign-up-input"
        type="text"
        name="customerEmail"
        placeholder="ENTER E-MAIL..."
        value={customerEmail}
        onChange={(e) => setCustomerEmail(e.target.value)}
      />
      <input
        className="customer-sign-up-input"
        type="text"
        name="password"
        placeholder="ENTER PASSWORD..."
        value={customerPassword}
        onChange={(e) => setCustomerPassword(e.target.value)}
      />
      <input
        className="customer-sign-up-input"
        type="text"
        name="passwordMatch"
        placeholder="RE-ENTER PASSWORD..."
        value={customerPasswordMatch}
        onChange={(e) => setCustomerPasswordMatch(e.target.value)}
      />
      <button className="customer-sign-up-btn">SIGN UP</button>
      <button className="customer-sign-up-go-back-btn">Go Back</button>
    </form>
  );
};

export default CustomerSignUp;
