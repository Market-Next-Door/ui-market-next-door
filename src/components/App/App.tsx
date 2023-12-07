import React, { useEffect, useState } from "react";

import "./App.css";
import {
  getAllVendors,
  getAllCustomers,
  // getAllItems,
  getAllPreOrders,
} from "../../apiCalls";
import LandingPage from "../LandingPage/LandingPage";
import VendorDashboard from "../VendorDashboard/VendorDashboard";
import CustomerDash from "../CustomerDashboard/CustomerDashboard";
import VendorLogIn from "../VendorLogIn/VendorLogIn";
import VendorSignUp from "../VendorSignUp/VendorSignUp";
import CustomerLogIn from "../CustomerLogIn/CustomerLogIn";
import CustomerSignUp from "../CustomerSignUp/CustomerSignUp";
import VendorOrders from "../VendorOrders/VendorOrders";
import CustomerOrders from "../CustomerOrders/CustomerOrders";
import CustomerSettings from "../CustomerSettings/CustomerSettings";
import VendorSettings from "../VendorSettings/VendorSettings";
import { NewItem, Item } from "../VendorDashboard/VendorDashboard";

function App() {
  const [allVendors, setAllVendors] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [allPreOrders, setAllPreOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="App">
      <LandingPage />
      <VendorLogIn />
      <VendorSignUp />
      <CustomerLogIn />
      <CustomerSignUp />
      <VendorDashboard allItems={allItems} allVendors={allVendors} />

      <CustomerDash allVendors={allVendors} />

      <VendorOrders />
      <CustomerOrders />
      <CustomerSettings />
      <VendorSettings />
    </div>
  );
}

export default App;
