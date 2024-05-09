import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { newCustomer, User } from '../../types';

import './App.css';
import {
  getAllVendors,
  getAllCustomers,
  getOneCustomer,
  getOneVendor,
} from '../../apiCalls';
import NavigationBar from '../NavigationBar/NavigationBar';
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
import { Customer, Vendor, NewItem, Item } from '../../types';
import Map from '../Map/Map';
import ErrorPage from '../ErrorPage/ErrorPage';
import 'leaflet/dist/leaflet.css';

function App() {
  const [allVendors, setAllVendors] = useState<Vendor[]>([]);
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [allPreOrders, setAllPreOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVendor, setIsVendor] = useState<boolean>(false);
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [appError, setAppError] = useState<string>('');
  const [selectedZipcode, setSelectedZipcode] = useState<string>('80206');
  const [selectedRadius, setSelectedRadius] = useState<string>('10');
  const [currentUserObj, setCurrentUserObj] = useState<User | null>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const vendorsData = await getAllVendors();
  //       const customersData = await getAllCustomers();
  //       setAllVendors(vendorsData);
  //       setAllCustomers(customersData);

  //       if (currentUserId) {
  //         const currentUser = await getOneCustomer(parseInt(currentUserId, 10));
  //         setCurrentUserObj(currentUser);
  //       }

  //       setIsLoading(false);
  //     } catch (error: any) {
  //       console.error('Error fetching data:', error);
  //       setAppError(error.message);
  //     }
  //   };
  //   fetchData();
  // }, [currentUserId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching vendors and customers data...');
        const vendorsData = await getAllVendors();
        const customersData = await getAllCustomers();

        console.log('Vendors data:', vendorsData);
        console.log('Customers data:', customersData);

        // Set vendors and customers state
        setAllVendors(vendorsData);
        setAllCustomers(customersData);

        // Check if currentUserId exists
        if (currentUserId) {
          console.log('Fetching current user data...');

          // Check if the user is a vendor or a customer
          if (isVendor) {
            // Fetch vendor data using currentUserId
            const currentVendor = await getOneVendor(
              parseInt(currentUserId, 10)
            );

            console.log('Current vendor data:', currentVendor);

            // Handle default_zipcode if needed
            const updatedZipcode =
              currentVendor.zipcode === 'default_zipcode'
                ? '78750'
                : currentVendor.zipcode;

            // Set currentUserObj state with updated zipcode
            setCurrentUserObj({ ...currentVendor, zipcode: updatedZipcode });
          } else {
            // Fetch customer data using currentUserId
            const currentCustomer = await getOneCustomer(
              parseInt(currentUserId, 10)
            );

            console.log('Current customer data:', currentCustomer);

            // Handle default_zipcode if needed
            const updatedZipcode =
              currentCustomer.zipcode === 'default_zipcode'
                ? '78750'
                : currentCustomer.zipcode;

            // Set currentUserObj state with updated zipcode
            setCurrentUserObj({ ...currentCustomer, zipcode: updatedZipcode });
          }

          // Add a console log here to check the structure of currentUserObj
          console.log('Structure of currentUserObj:', currentUserObj);
        }

        // Set loading state to false
        setIsLoading(false);
      } catch (error: any) {
        // Handle errors
        console.error('Error fetching data:', error);
        setAppError(error.message);
      }
    };

    // Call fetchData function
    fetchData();
  }, [currentUserId, isVendor]);

  // Add a console log to check currentUserObj in the Map component
  console.log('currentUserObj in Map component:', currentUserObj);

  function addCustomer(newCustomer: Customer) {
    setAllCustomers([...allCustomers, newCustomer]);
  }

  function addVendor(newVendor: Vendor) {
    setAllVendors([...allVendors, newVendor]);
  }

  function addZipAndRadius(zipcode: string, radius: string) {
    setSelectedZipcode(zipcode);
    setSelectedRadius(radius);
  }

  return appError ? (
    <ErrorPage
      error={appError}
      message="We're experiencing server issues.  Please try again later."
    />
  ) : isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/vendorlogin"
          element={
            <VendorLogIn
              selectedZipcode={selectedZipcode}
              selectedRadius={selectedRadius}
              allVendors={allVendors}
              allItems={allItems}
              isVendor={isVendor}
              setIsVendor={setIsVendor}
              setCurrentUserId={setCurrentUserId}
              setCurrentUserObj={setCurrentUserObj}
              currentUserId={currentUserId}
            />
          }
        />
        <Route
          path="/vendorsignup"
          element={<VendorSignUp addVendor={addVendor} />}
        />
        <Route
          path="/customerlogin"
          element={
            <CustomerLogIn
              allCustomers={allCustomers}
              setIsVendor={setIsVendor}
              setCurrentUserId={setCurrentUserId}
              selectedRadius={selectedRadius}
              setCurrentUserObj={setCurrentUserObj}
            />
          }
        />
        <Route
          path="/customersignup"
          element={<CustomerSignUp addCustomer={addCustomer} />}
        />
        <Route
          path="/vendordashboard/:vendorid"
          element={
            <VendorDashboard
              selectedZipcode={selectedZipcode}
              selectedRadius={selectedRadius}
              allItems={allItems}
              allVendors={allVendors}
              isVendor={isVendor}
              setIsVendor={setIsVendor}
              setCurrentUserId={setCurrentUserId}
              setCurrentUserObj={setCurrentUserObj}
              currentUserId={currentUserId}
            />
          }
        />
        <Route
          path="/customerdashboard/:id"
          element={
            currentUserObj ? (
              <CustomerDash
                selectedZipcode={selectedZipcode}
                selectedRadius={selectedRadius}
                allVendors={allVendors}
                isVendor={isVendor}
                currentUserId={currentUserId}
                currentUserObj={currentUserObj!}
              />
            ) : (
              <p>Loading...</p>
            )
          }
        />
        <Route
          path="/vendororders/:id"
          element={
            <VendorOrders
              selectedZipcode={selectedZipcode}
              selectedRadius={selectedRadius}
              isVendor={isVendor}
              currentUserId={currentUserId}
            />
          }
        />
        <Route
          path="/customerorders/:id"
          element={
            <CustomerOrders
              selectedZipcode={selectedZipcode}
              selectedRadius={selectedRadius}
              isVendor={isVendor}
              currentUserId={currentUserId}
            />
          }
        />
        <Route
          path="/customersettings/:id"
          element={
            <CustomerSettings
              selectedZipcode={selectedZipcode}
              selectedRadius={selectedRadius}
              isVendor={isVendor}
              currentUserId={currentUserId}
            />
          }
        />
        <Route
          path="/vendorsettings/:id"
          element={
            <VendorSettings
              selectedZipcode={selectedZipcode}
              selectedRadius={selectedRadius}
              isVendor={isVendor}
              currentUserId={currentUserId}
            />
          }
        />
        <Route
          path="/map/:zip/:radius"
          element={
            currentUserObj ? (
              <Map
                addZipAndRadius={addZipAndRadius}
                selectedZipcode={selectedZipcode}
                selectedRadius={selectedRadius}
                isVendor={isVendor}
                currentUserId={currentUserId}
                currentUserObj={currentUserObj}
              />
            ) : (
              <p>Loading...</p>
            )
          }
        />
        <Route
          path="*"
          element={
            <ErrorPage
              error={appError}
              message="The page you're looking for doesn't exist, please try a different url."
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
