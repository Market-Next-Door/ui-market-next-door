import React from 'react';
import './NavigationBar.css';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router';

export type NavigationBarProps = {
  selectedZipcode: string;
  selectedRadius: string;
  isVendor: boolean;
  currentUserId: string;
};

const NavigationBar = ({
  selectedZipcode,
  selectedRadius,
  isVendor,
  currentUserId,
}: NavigationBarProps) => {
  let rootProducts = '';
  isVendor
    ? (rootProducts = `/vendordashboard/${currentUserId}`)
    : (rootProducts = `/customerdashboard/${currentUserId}`);

  let rootOrders = '';
  isVendor
    ? (rootOrders = `/vendororders/${currentUserId}`)
    : (rootOrders = `/customerorders/${currentUserId}`);

  let rootSettings = '';
  isVendor
    ? (rootSettings = `/vendorsettings/${currentUserId}`)
    : (rootSettings = `/customersettings/${currentUserId}`);

  let rootMap = '';
  isVendor
    ? (rootMap = `/map/${selectedZipcode}/${selectedRadius}`)
    : (rootMap = `/map/${selectedZipcode}/${selectedRadius}`);

  const navigate = useNavigate();

  function handleSignOut() {
    navigate('/');
    window.location.reload();
  }

  return (
    <nav className="mnd-nav">
      <NavLink
        className="products btn"
        to={rootProducts}
        style={({ isActive }) => {
          return isActive
            ? {
                color: 'white',
                backgroundColor: '#274e13',
                textDecoration: 'none',
              }
            : {};
        }}
      >
        PRODUCTS
      </NavLink>
      <NavLink
        className="orders btn"
        to={rootOrders}
        style={({ isActive }) => {
          return isActive
            ? {
                color: 'white',
                backgroundColor: '#ce7e00',
                textDecoration: 'none',
              }
            : {};
        }}
      >
        ORDERS
      </NavLink>
      <NavLink
        className="map btn"
        to={rootMap}
        style={({ isActive }) => {
          return isActive
            ? {
                color: 'white',
                backgroundColor: '#05339f',
                textDecoration: 'none',
              }
            : {};
        }}
      >
        MARKET MAP
      </NavLink>
      <NavLink
        className="settings btn"
        to={rootSettings}
        style={({ isActive }) => {
          return isActive
            ? {
                color: 'white',
                backgroundColor: '#343a40',
                textDecoration: 'none',
              }
            : {};
        }}
      >
        SETTINGS
      </NavLink>

      <button className="signout btn" onClick={handleSignOut}>
        SIGN OUT
      </button>
    </nav>
  );
};

export default NavigationBar;
