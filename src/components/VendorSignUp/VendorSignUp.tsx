import React, { useEffect, useState } from 'react';
import './VendorSignUp.css';
import { useNavigate } from 'react-router';
import { postNewVendor } from '../../apiCalls';
import ErrorPage from '../ErrorPage/ErrorPage';
import { VendorSignUpProps } from '../../types';

const VendorSignUp = ({ addVendor }: VendorSignUpProps) => {
  const [vendorFirstName, setVendorFirstName] = useState('');
  const [vendorLastName, setVendorLastName] = useState('');
  // const [vendorMarketName, setVendorMarketName] = useState(0);
  const [vendorEmail, setVendorEmail] = useState('');
  const [vendorPassword, setVendorPassword] = useState('');
  const [vendorPasswordMatch, setVendorPasswordMatch] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [vendorSignUpError, setVendorSignUpError] = useState('');

  const navigate = useNavigate();
  function handleGoBack() {
    navigate('/');
  }

  function handleSignUp(e: any) {
    e.preventDefault();

    const newVendor = {
      first_name: vendorFirstName,
      last_name: vendorLastName,
      vendor_name: vendorName,
      password: vendorPassword,
      email: vendorEmail,
      market: 1,
    };

    postNewVendor(newVendor)
      .then(data => {
        addVendor(data);
        navigate('/vendorlogin');
      })
      .catch(error => setVendorSignUpError(error.message));

    addVendor(newVendor);
  }
  return vendorSignUpError ? (
    <ErrorPage
      error={vendorSignUpError}
      message="We're experiencing server issues.  Please try again later."
    />
  ) : (
    <form className="vendor-sign-up-container">
      <h2 className="vendor-sign-up-header">MARKET NEXT DOOR</h2>
      <h3 className="vendor-sign-up-subtext">VENDOR SIGN UP</h3>

      <input
        className="vendor-sign-up-input"
        type="text"
        name="vendorName"
        placeholder="BUSINESS NAME..."
        value={vendorName}
        onChange={e => setVendorName(e.target.value)}
      />
      <input
        className="vendor-sign-up-input"
        type="text"
        name="firstName"
        placeholder="FIRST NAME..."
        value={vendorFirstName}
        onChange={e => setVendorFirstName(e.target.value)}
      />
      <input
        className="vendor-sign-up-input"
        type="text"
        name="lastName"
        placeholder="LAST NAME..."
        value={vendorLastName}
        onChange={e => setVendorLastName(e.target.value)}
      />
      {/* <input
        className="vendor-sign-up-input"
        type="text"
        name="marketName"
        placeholder="MARKET NAME..."
        value={vendorMarketName}
        onChange={(e) => setVendorMarketName(e.target.value)}
      /> */}
      <input
        className="vendor-sign-up-input"
        type="text"
        name="vendorEmail"
        placeholder="ENTER E-MAIL..."
        value={vendorEmail}
        onChange={e => setVendorEmail(e.target.value)}
      />
      <input
        className="vendor-sign-up-input"
        type="text"
        name="password"
        placeholder="ENTER PASSWORD..."
        value={vendorPassword}
        onChange={e => setVendorPassword(e.target.value)}
      />
      <input
        className="vendor-sign-up-input"
        type="text"
        name="passwordMatch"
        placeholder="RE-ENTER PASSWORD..."
        value={vendorPasswordMatch}
        onChange={e => setVendorPasswordMatch(e.target.value)}
      />
      <button className="vendor-sign-up-btn" onClick={e => handleSignUp(e)}>
        SIGN UP
      </button>
      <button className="vendor-sign-up-go-back-btn" onClick={handleGoBack}>
        Go Back
      </button>
    </form>
  );
};

export default VendorSignUp;
