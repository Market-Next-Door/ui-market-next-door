import React from "react";

import "./App.css";
import LandingPage from "../LandingPage/LandingPage";
import FarmerDashboard from "../FarmerDashboard/FarmerDashboard";
import CustomerDash from "../CustomerDashboard/CustomerDashboard";

function App() {
  return (
    <div className="App">
      <LandingPage />
      <FarmerDashboard />
      <CustomerDash />
    </div>
  );
}

export default App;
