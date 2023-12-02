import React from "react";
import "./NavigationBar.css";

const NavigationBar = () => {
  return (
    <nav className="mnd-nav">
      <button className="products btn">PRODUCTS</button>
      <button className="orders btn">ORDERS</button>
      <button className="settings btn">SETTINGS</button>
    </nav>
  );
};

export default NavigationBar;
