import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import {
  getAllVendors,
  getAllCustomers,
  // getAllItems,
  getAllPreOrders,
} from '../../apiCalls';
import LandingPage from '../LandingPage/LandingPage';
import VendorDashboard from '../VendorDashboard/VendorDashboard';
import CustomerDash from '../CustomerDashboard/CustomerDashboard';
import VendorLogIn from '../VendorLogIn/VendorLogIn';
import VendorSignUp from '../VendorSignUp/VendorSignUp';
import CustomerLogIn from '../CustomerLogIn/CustomerLogIn';
import CustomerSignUp from '../CustomerSignUp/CustomerSignUp';
import VendorOrders from '../VendorOrders/VendorOrders';
import CustomerOrders from '../CustomerOrders/CustomerOrders';
import CustomerSettings from '../CustomerSettings/CustomerSettings';
import VendorSettings from '../VendorSettings/VendorSettings';
import { NewItem, Item } from '../VendorDashboard/VendorDashboard';

function App() {
  const [allVendors, setAllVendors] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [allPreOrders, setAllPreOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVendor, setIsVendor] = useState<boolean>(false);
  const [currentUserId, setCurrentUserId] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vendorsData = await getAllVendors();
        const customersData = await getAllCustomers();
        // const itemsData = await getAllItems();
        //const preOrdersData = await getAllPreOrders();
        setAllVendors(vendorsData);
        setAllCustomers(customersData);
        // setAllItems(itemsData);
        //setAllPreOrders(preOrdersData)
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/vendorlogin"
          element={
            <VendorLogIn
              allVendors={allVendors}
              allItems={allItems}
              isVendor={isVendor}
              setIsVendor={setIsVendor}
              setCurrentUserId={setCurrentUserId}
              currentUserId={currentUserId}
            />
          }
        />
        <Route path="/vendorsignup" element={<VendorSignUp />} />
        <Route
          path="/customerlogin"
          element={
            <CustomerLogIn
              allCustomers={allCustomers}
              setIsVendor={setIsVendor}
              setCurrentUserId={setCurrentUserId}
            />
          }
        />
        <Route path="/customersignup" element={<CustomerSignUp />} />
        <Route
          path="/vendordashboard/:vendorid"
          element={
            <VendorDashboard
              allItems={allItems}
              allVendors={allVendors}
              isVendor={isVendor}
              setIsVendor={setIsVendor}
              setCurrentUserId={setCurrentUserId}
              currentUserId={currentUserId}
            />
          }
        />
        <Route
          path="/customerdashboard/:id"
          element={
            <CustomerDash
              allVendors={allVendors}
              isVendor={isVendor}
              currentUserId={currentUserId}
            />
          }
        />

        <Route
          path="/vendororders/:id"
          element={
            <VendorOrders isVendor={isVendor} currentUserId={currentUserId} />
          }
        />
        <Route
          path="/customerorders/:id"
          element={
            <CustomerOrders isVendor={isVendor} currentUserId={currentUserId} />
          }
        />
        <Route
          path="/customersettings/:id"
          element={
            <CustomerSettings
              isVendor={isVendor}
              currentUserId={currentUserId}
            />
          }
        />
        <Route
          path="/vendorsettings/:id"
          element={
            <VendorSettings isVendor={isVendor} currentUserId={currentUserId} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
