import React from "react";

import "./App.css";
import LandingPage from "../LandingPage/LandingPage";
import FarmerDashboard from "../FarmerDashboard/FarmerDashboard";
import CustomerDash from "../CustomerDashboard/CustomerDashboard";
import VendorLogIn from "../VendorLogIn/VendorLogIn";

function App() {
  return (
    <div className="App">
      <LandingPage />
      <VendorLogIn />
      <FarmerDashboard />
      <CustomerDash />
    </div>
  );
}

export default App;
