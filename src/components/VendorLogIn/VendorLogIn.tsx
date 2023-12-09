import React, { useState } from "react";
import "./VendorLogIn.css";
import { useNavigate } from "react-router";
import { VendorDashboardProps } from "../VendorDashboard/VendorDashboard";

export type Vendor = {
  email: string;
  password: string;
  id: number;
};

const VendorLogIn = ({ allItems, allVendors }: VendorDashboardProps) => {
  const navigate = useNavigate();
  function handleGoBack() {
    navigate("/");
  }

  function handleSignup() {
    navigate("/vendorsignup");
  }

  function handleLogin(e: any) {
    e.preventDefault();
    console.log(allVendors);
    const validUser = allVendors.find(
      (vendor: Vendor) =>
        vendor.email === vendorLoginEmail &&
        vendor.password === vendorLoginPassword
    );

    if (validUser) {
      console.log(validUser, "validuser");
      navigate(`/vendordashboard/${validUser.id}`);
    }
  }
  const [vendorLoginEmail, setVendorLoginEmail] = useState("");
  const [vendorLoginPassword, setVendorLoginPassword] = useState("");
  return (
    <form className="vendor-login-container">
      <h2 className="vendor-login-header">MARKET NEXT DOOR</h2>
      <h3 className="vendor-login-subtext">VENDOR LOGIN</h3>

      <input
        className="vendor-login-input"
        type="text"
        name="vendorEmail"
        placeholder="Enter email..."
        value={vendorLoginEmail}
        onChange={(e) => setVendorLoginEmail(e.target.value)}
      />
      <input
        className="vendor-login-input"
        type="text"
        name="vendorPassword"
        placeholder="Enter password..."
        value={vendorLoginPassword}
        onChange={(e) => setVendorLoginPassword(e.target.value)}
      />
      <button
        className="vendor-login-submit-btn"
        onClick={(e) => handleLogin(e)}
      >
        SIGN IN
      </button>
      <p className="vendor-login-text">OR</p>
      <button className="vendor-login-submit-btn" onClick={handleSignup}>
        SIGN UP
      </button>
      <button className="vendor-login-go-back-btn" onClick={handleGoBack}>
        Go Back
      </button>
    </form>
  );
};

export default VendorLogIn;
