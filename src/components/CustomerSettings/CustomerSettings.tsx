import React, { useState } from "react";
import Header from "../Header/Header";
import NavigationBar from "../NavigationBar/NavigationBar";
import "./CustomerSettings.css";

export default function CustomerSettings() {
  const [isEditable, setIsEditable] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

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
  return (
    <div className="customer-settings-container">
      <Header />
      <NavigationBar />
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
          <span className="account-email">potatoes@mail.com</span>
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
  );
}
