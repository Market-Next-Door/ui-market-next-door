import React from 'react';

import './App.css';
import LandingPage from '../LandingPage/LandingPage';
import FarmerDashboard from '../FarmerDashboard/FarmerDashboard';
import CustomerDash from '../CustomerDashboard/CustomerDashboard';
import VendorLogIn from '../VendorLogIn/VendorLogIn';
import VendorSignUp from '../VendorSignUp/VendorSignUp';
import CustomerLogIn from '../CustomerLogIn/CustomerLogIn';
import CustomerSignUp from '../CustomerSignUp/CustomerSignUp';
import VendorOrders from '../VendorOrders/VendorOrders';
import CustomerOrders from '../CustomerOrders/CustomerOrders';
function App() {
  return (
    <div className="App">
      <LandingPage />
      <VendorLogIn />
      <VendorSignUp />
      <CustomerLogIn />
      <CustomerSignUp />
      <FarmerDashboard />
      <CustomerDash />
      <VendorOrders />
      <CustomerOrders />
    </div>
  );
}

export default App;
