import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import NavigationBar from "../NavigationBar/NavigationBar";
import "./CustomerSettings.css";
import { getOneCustomer } from "../../apiCalls";
import { NavigationBarProps } from "../NavigationBar/NavigationBar";
import { ThreeDots } from "react-loader-spinner";
import { useParams } from "react-router";
import ErrorPage from "../ErrorPage/ErrorPage";

type Customer = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};
export default function CustomerSettings({
  isVendor,
  currentUserId,
}: NavigationBarProps) {
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const paramsid = useParams();
  const [customerSettingsError, setCustomerSettingsError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerData = await getOneCustomer(Number(paramsid.id) || 0);
        setCurrentCustomer(customerData);
        setFirstName(customerData?.first_name || "");
        setLastName(customerData?.last_name || "");
        setPassword(customerData?.password || "");
        setEmail(customerData?.email || "");
        setIsLoading(false);
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setCustomerSettingsError(error.message)
      }
    };
    fetchData();
  }, []);
  function handleEditToggle() {
    setIsEditable(!isEditable);
  }

  function handleDeleteAccountClick() {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action is IRREVERSIBLE! AH😬"
    );
    if (confirmed) {
      console.log("account deleted!");
    }
  }

  function handleSaveChanges() {
    console.log("changes saved!");
    setIsEditable(false);
  }
  return customerSettingsError ? (
    <ErrorPage error={customerSettingsError} message="We're experiencing server issues.  Please try again later."/>
    ) : (
      !currentCustomer ? (
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
      <Header name={firstName} />
      <NavigationBar isVendor={isVendor} currentUserId={currentUserId} />
      <div className="account-box">
        <p className="my-account-info">
          First name:
          <input
            className="account-input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            readOnly={!isEditable}
          />
        </p>
        <p className="my-account-info">
          Last name:
          <input
            className="account-input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
  ));
}
