import React from "react";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <p className="landing-tagline">Community • Reducing Waste • Local </p>
      <h2 className="landing-header">MARKET NEXT DOOR</h2>
      <p className="landing-tagline">Perfectly Imperfect Goods & Foods</p>
      <div className="landing-btns">
        <button className="landing-btn">Vendor</button>
        <button className="landing-btn">Customer</button>
      </div>
    </div>
  );
};

export default LandingPage;
