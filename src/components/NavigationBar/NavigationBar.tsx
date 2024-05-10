import React from 'react';
import './NavigationBar.css';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { NavigationBarProps } from '../../types';

const NavigationBar = ({
  selectedZipcode,
  selectedRadius,
  isVendor,
  currentUserId,
  currentUserObj,
  showNavbar,
}: NavigationBarProps) => {
  const defaultZipcode = currentUserObj?.default_zipcode || 'default_zipcode';

  const rootMap = `/map/${defaultZipcode}/${selectedRadius}`;

  // let rootMap = '';
  // isVendor
  //   ? (rootMap = `/map/${selectedZipcode}/${selectedRadius}`)
  //   : (rootMap = `/map/${selectedZipcode}/${selectedRadius}`);

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

  const navigate = useNavigate();

  function handleSignOut() {
    navigate('/');
    window.location.reload();
  }

  return (
    <>
      {showNavbar && ( // Conditionally render NavigationBar
        <nav className="mnd-nav">
          <NavLink
            className="map btn"
            to={rootMap}
            style={({ isActive }) => {
              return isActive && window.location.pathname === rootMap
                ? {
                    color: 'white',
                    backgroundColor: '#2A81CB',
                    textDecoration: 'none',
                  }
                : {};
            }}
          >
            MARKET MAP
          </NavLink>
          <NavLink
            className="products btn"
            to={rootProducts}
            // Style code
          >
            PRODUCTS
          </NavLink>
          <NavLink
            className="orders btn"
            to={rootOrders}
            // Style code
          >
            ORDERS
          </NavLink>
          <NavLink
            className="settings btn"
            to={rootSettings}
            // Style code
          >
            SETTINGS
          </NavLink>

          <button className="signout btn" onClick={handleSignOut}>
            SIGN OUT
          </button>
        </nav>
      )}
    </>
  );
};

export default NavigationBar;
