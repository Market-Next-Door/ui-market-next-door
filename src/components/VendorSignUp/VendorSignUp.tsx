import React, { useEffect, useState } from "react";
import "./VendorSignUp.css";
import { useNavigate } from "react-router";

const VendorSignUp = () => {
  const [vendorFirstName, setVendorFirstName] = useState("");
  const [vendorLastName, setVendorLastName] = useState("");
  const [vendorMarketName, setVendorMarketName] = useState("");
  const [vendorEmail, setVendorEmail] = useState("");
  const [vendorPassword, setVendorPassword] = useState("");
  const [vendorPasswordMatch, setVendorPasswordMatch] = useState("");

  const submitVendor = () => {
    const newVendor = {
      vendorFirstName,
      vendorLastName,
      vendorPassword,
      vendorPasswordMatch,
    };
  };
  const navigate = useNavigate();
  function handleGoBack() {
    navigate("/");
  }

  function handleSignUp() {
    // do a post request
  }
  return (
    <form className="vendor-sign-up-container">
      <h2 className="vendor-sign-up-header">MARKET NEXT DOOR</h2>
      <h3 className="vendor-sign-up-subtext">VENDOR SIGN UP</h3>

      <input
        className="vendor-sign-up-input"
        type="text"
        name="firstName"
        placeholder="FIRST NAME..."
        value={vendorFirstName}
        onChange={(e) => setVendorFirstName(e.target.value)}
      />
      <input
        className="vendor-sign-up-input"
        type="text"
        name="lastName"
        placeholder="LAST NAME..."
        value={vendorLastName}
        onChange={(e) => setVendorLastName(e.target.value)}
      />
      <input
        className="vendor-sign-up-input"
        type="text"
        name="marketName"
        placeholder="MARKET NAME..."
        value={vendorMarketName}
        onChange={(e) => setVendorMarketName(e.target.value)}
      />
      <input
        className="vendor-sign-up-input"
        type="text"
        name="vendorEmail"
        placeholder="ENTER E-MAIL..."
        value={vendorEmail}
        onChange={(e) => setVendorEmail(e.target.value)}
      />
      <input
        className="vendor-sign-up-input"
        type="text"
        name="password"
        placeholder="ENTER PASSWORD..."
        value={vendorPassword}
        onChange={(e) => setVendorPassword(e.target.value)}
      />
      <input
        className="vendor-sign-up-input"
        type="text"
        name="passwordMatch"
        placeholder="RE-ENTER PASSWORD..."
        value={vendorPasswordMatch}
        onChange={(e) => setVendorPasswordMatch(e.target.value)}
      />
      <button className="vendor-sign-up-btn" onClick={handleSignUp}>
        SIGN UP
      </button>
      <button className="vendor-sign-up-go-back-btn" onClick={handleGoBack}>
        Go Back
      </button>
    </form>
  );
};

export default VendorSignUp;
