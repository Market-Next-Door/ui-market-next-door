import React from "react";
import "./VendorSignUp.css";

const VendorSignUp = () => {
  return (
    <div className="sign-up-container">
      <h2 className="sign-up-header">MARKET NEXT DOOR</h2>
      <input
        className="sign-up-input"
        type="text"
        placeholder="FIRST NAME..."
        value="John"
      />
      <input
        className="sign-up-input"
        type="text"
        placeholder="LAST NAME..."
        value="Lamb"
      />
      <input
        className="sign-up-input"
        type="text"
        placeholder="ENTER E-MAIL..."
        value="john@mail.com"
      />
      <input
        className="sign-up-input"
        type="text"
        placeholder="ENTER PASSWORD..."
        value="456"
      />
      <input
        className="sign-up-input"
        type="text"
        placeholder="RE-ENTER PASSWORD..."
        value="456"
      />
      <button className="sign-up-btn">SIGN UP</button>
      <button className="sign-up-go-back-btn">Go Back</button>
    </div>
  );
};

export default VendorSignUp;
