import React, { useState } from 'react';
import './VendorDashboard.css';
import Header from '../Header/Header';
import NavigationBar from '../NavigationBar/NavigationBar';
import Switch from 'react-switch';

const VendorDashboard = () => {
  return (
    <div className="vendor-container">
      <Header />
      <NavigationBar />
      <form className="add-item-form">
        <input
          className="add-item-item-name"
          type="text"
          placeholder="Item Name..."
        />

        <input
          className="add-item-item-size"
          type="text"
          placeholder="Size..."
        />
        <input
          className="add-item-item-price"
          type="text"
          placeholder="Price..."
        />
        <input
          className="add-item-item-quantity"
          type="text"
          placeholder="Quantity Available..."
        />
        <input
          className="add-item-item-notes"
          type="text"
          placeholder="Details..."
        />
        <label htmlFor="files">upload photo</label>
        <input className="add-item-file" type="file" id="files" />

        <button className="post-btn">ADD ITEM</button>
      </form>
      <p
        style={{ paddingLeft: '3rem', fontSize: '1.4rem', fontWeight: 'bold' }}
      >
        INVENTORY FOR THE WEEK OF MON DEC 10 2023 - SUN DEC 17 2023{' '}
      </p>
      <section className="vendor-items-display">
        <VendorItemCard />
        <VendorItemCard />
        <VendorItemCard />
        <VendorItemCard />
      </section>
    </div>
  );
};

const VendorItemCard = () => {
  const [
    checkedAvailablehandleChangeAvailable,
    setCheckedAvailablehandleChangeAvailable,
  ] = useState(false);

  const handleChangeAvailable = (newChecked: boolean) => {
    setCheckedAvailablehandleChangeAvailable(newChecked);
  };
  const [itemName, setItemName] = useState<string>('Carrots');
  const [itemSize, setItemSize] = useState<string>('5lb');
  const [itemDetails, setItemDetails] = useState<string>(
    'Small, crooked carrots'
  );
  const [quantityAvailable, setQuantityAvailable] = useState<number>(47);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [itemPrice, setItemPrice] = useState<number>(5.99);
  const handleEditToggle = () => {
    setIsEditable(!isEditable);
  };

  const handleSaveChanges = () => {
    setIsEditable(false);
  };

  return (
    <div className="vendor-item-card">
      <div className="vendor-item-image">
        <img src="carrots.jpg" alt="Item" />
      </div>
      <div className="item-details">
        <p>
          Name:
          <input
            className="item-input"
            value={itemName}
            onChange={e => setItemName(e.target.value)}
            readOnly={!isEditable}
          />
        </p>
        <p>
          Size:
          <input
            className="item-input"
            value={itemSize}
            onChange={e => setItemSize(e.target.value)}
            readOnly={!isEditable}
          />
        </p>
        <p>
          Price:
          <input
            className="item-input"
            value={itemPrice}
            onChange={e => setItemPrice(parseInt(e.target.value))}
            readOnly={!isEditable}
          />
        </p>
        <p>
          Details:
          <input
            className="item-input"
            value={itemDetails}
            onChange={e => setItemDetails(e.target.value)}
            readOnly={!isEditable}
          />
        </p>
        <div className="quantity-container">
          <p>
            Quantity Available:
            <input
              className="item-input"
              type="number"
              value={quantityAvailable}
              onChange={e => setQuantityAvailable(Number(e.target.value))}
              readOnly={!isEditable}
            />
          </p>
          <p>Quantity Ordered: 3 </p>
        </div>
        <div className="available-container">
          <p>Available</p>
          <Switch
            onChange={handleChangeAvailable}
            checked={checkedAvailablehandleChangeAvailable}
          />
        </div>
        <div className="item-btns">
          {isEditable ? (
            <button className="save-changes" onClick={handleSaveChanges}>
              Save
            </button>
          ) : (
            <button className="edit-changes" onClick={handleEditToggle}>
              Edit
            </button>
          )}
          <button className="delete-item-btn">X</button>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
