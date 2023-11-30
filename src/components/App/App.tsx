import React from "react";

import "./App.css";
import LandingPage from "../LandingPage/LandingPage";
import FarmerDashboard from "../FarmerDashboard/FarmerDashboard";
import CustomerDash from "../CustomerDashboard/CustomerDashboard";
import VendorLogIn from "../VendorLogIn/VendorLogIn";
import CustomerLogIn from "../CustomerLogIn/CustomerLogIn";

function App() {
  return (
    <div className="App">
      <LandingPage />
      <VendorLogIn />
      <CustomerLogIn />
      <FarmerDashboard />
      <CustomerDash />
    </div>
  );
}

export default App;
