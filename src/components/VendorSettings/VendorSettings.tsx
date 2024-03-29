import './VendorSettings.css';

import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import NavigationBar from '../NavigationBar/NavigationBar';
import { deleteVendor, getOneVendor, updateVendorData } from '../../apiCalls';
import { NavigationBarProps, Vendor } from '../../types';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate, useParams } from 'react-router';
import ErrorPage from '../ErrorPage/ErrorPage';

export default function VendorSettings({
  selectedZipcode,
  selectedRadius,
  isVendor,
  currentUserId,
}: NavigationBarProps) {
  const [currentVendor, setCurrentVendor] = useState<Vendor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [marketName, setMarketName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [vendorSettingsError, setVendorSettingsError] = useState('');
  const navigate = useNavigate();
  const paramsid = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const vendorData = await getOneVendor(Number(paramsid.id) || 0);
        setCurrentVendor(vendorData);
        setFirstName(vendorData?.first_name || '');
        setLastName(vendorData?.last_name || '');
        setMarketName(vendorData?.vendor_name || '');
        setPassword(vendorData?.password || '');
        setEmail(vendorData?.email || '');
        setIsLoading(false);
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setVendorSettingsError(error.message);
      }
    };
    fetchData();
  }, []);

  function handleEditToggle() {
    setIsEditable(!isEditable);
  }

  function handleDeleteAccountClick() {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action is IRREVERSIBLE! AH😬'
    );
    if (confirmed) {
      console.log('account deleted!');
      deleteVendor(Number(paramsid.id));
      navigate('/');
      setTimeout(function () {
        window.location.reload();
      }, 500);
    }
  }

  function handleSaveChanges() {
    const updatedUserData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      vendor_name: marketName,
    };
    updateVendorData(Number(paramsid.id), updatedUserData);
    setIsEditable(false);
  }
  return vendorSettingsError ? (
    <ErrorPage
      error={vendorSettingsError}
      message="We're experiencing server issues.  Please try again later."
    />
  ) : !currentVendor ? (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="#4fa94d"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      visible={true}
    />
  ) : (
    <div className="customer-settings-container">
      <Header greeting="Welcome" name={firstName} />
      <NavigationBar
        selectedZipcode={selectedZipcode}
        selectedRadius={selectedRadius}
        isVendor={isVendor}
        currentUserId={currentUserId}
      />
      <div className="account-box">
        <p className="my-account-info">
          First name:
          <input
            className="account-input"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            readOnly={!isEditable}
          />
        </p>
        <p className="my-account-info">
          Last name:
          <input
            className="account-input"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            readOnly={!isEditable}
          />
        </p>
        <p className="my-account-info">
          Market Name:
          <input
            className="account-input"
            value={marketName}
            onChange={e => setMarketName(e.target.value)}
            readOnly={!isEditable}
          />
        </p>
        <p className="my-account-info-email">
          EMAIL:
          <span className="account-email">{email}</span>
        </p>
        <p className="my-account-info-password">
          Password:
          <input
            className="account-input-password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            readOnly={!isEditable}
          />
        </p>
        <div className="settings-account-btns">
          {isEditable ? (
            <button className="save-changes" onClick={handleSaveChanges}>
              Save
            </button>
          ) : (
            <button className="edit-changes" onClick={handleEditToggle}>
              Edit
            </button>
          )}
          <button className="delete-account" onClick={handleDeleteAccountClick}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
