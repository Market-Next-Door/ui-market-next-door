import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import NavigationBar from '../NavigationBar/NavigationBar';
import './CustomerSettings.css';
import {
  deleteCustomer,
  getOneCustomer,
  updateCustomerData,
} from '../../apiCalls';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate, useParams } from 'react-router';
import ErrorPage from '../ErrorPage/ErrorPage';
import { Customer, NavigationBarProps } from '../../types';

export default function CustomerSettings({
  selectedZipcode,
  selectedRadius,
  isVendor,
  currentUserId,
}: NavigationBarProps) {
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const paramsid = useParams();
  const [customerSettingsError, setCustomerSettingsError] = useState('');

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerData = await getOneCustomer(Number(paramsid.id) || 0);
        setCurrentCustomer(customerData);
        setFirstName(customerData?.first_name || '');
        setLastName(customerData?.last_name || '');
        setPassword(customerData?.password || '');
        setEmail(customerData?.email || '');
        setIsLoading(false);
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setCustomerSettingsError(error.message);
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

    if (confirmed && paramsid.id !== undefined) {
      deleteCustomer(Number(paramsid.id));
      navigate('/');
      setTimeout(function () {
        window.location.reload();
      }, 500);
    }
  }

  function handleSaveChanges() {
    console.log('changes saved!');
    const updatedUserData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    };
    updateCustomerData(Number(paramsid.id), updatedUserData);

    setIsEditable(false);
  }
  return customerSettingsError ? (
    <ErrorPage
      error={customerSettingsError}
      message="We're experiencing server issues.  Please try again later."
    />
  ) : !currentCustomer ? (
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
