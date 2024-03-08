import React from 'react';
import Switch from 'react-switch';
import './VendorItemCard.css';
import { useState } from 'react';
import { updateVendorItem } from '../../apiCalls';
import ErrorPage from '../ErrorPage/ErrorPage';
import { VendorItemCardProps, updatedItem } from '../../types';

const VendorItemCard = ({
  id,
  item_name,
  vendor,
  price,
  quantity,
  size,
  availability,
  description,
  image,
  vendorid,
  onDelete,
}: VendorItemCardProps) => {
  const [isChecked, setIsChecked] = useState(availability);
  const [isEditable, setIsEditable] = useState<boolean>(false);

  // const [allItems, setAllItems] = useState<Item[]>([]);
  const [itemName, setItemName] = useState<string>(item_name);
  const [itemSize, setItemSize] = useState<string>(size);
  const [itemDetails, setItemDetails] = useState<string>(description);
  const [quantityAvailable, setQuantityAvailable] = useState<number>(quantity);
  const [itemPrice, setItemPrice] = useState<string>(price);
  const [
    checkedAvailablehandleChangeAvailable,
    setCheckedAvailablehandleChangeAvailable,
  ] = useState(availability);
  const [vendorItemCardError, setVendorItemCardError] = useState('');

  const handleChangeAvailable = (newChecked: boolean) => {
    setCheckedAvailablehandleChangeAvailable(newChecked);
  };

  const handleEditToggle = () => {
    setIsEditable(!isEditable);
  };

  const handleSaveChanges = () => {
    const updatedItem: updatedItem = {
      item_name: itemName,
      vendor: Number(vendorid),
      price: itemPrice,
      size: itemSize,
      quantity: quantityAvailable,
      availability: checkedAvailablehandleChangeAvailable,
      description: itemDetails,
      image: null,
    };
    setIsEditable(false);
    updateVendorItem(vendorid, id, updatedItem)
      // .then((data) => console.log(data))
      .catch(error => setVendorItemCardError(error.message));
  };

  return vendorItemCardError ? (
    <ErrorPage
      error={vendorItemCardError}
      message="We're experiencing server issues.  Please try again later."
    />
  ) : (
    <div className="vendor-item-card">
      <div className="vendor-item-image">
        <img src={image} alt={itemName} />
      </div>
      <div className="vendor-item-details">
        <p>
          Name:
          <input
            type="text"
            className="item-input"
            value={itemName}
            onChange={e => setItemName(e.target.value)}
            readOnly={!isEditable}
          />
        </p>
        <p>
          Size:
          <input
            type="text"
            className="item-input"
            value={itemSize}
            onChange={e => setItemSize(e.target.value)}
            readOnly={!isEditable}
          />
        </p>
        <p>
          Price:
          <input
            type="number"
            className="item-input"
            value={itemPrice}
            onChange={e => setItemPrice(e.target.value)}
            readOnly={!isEditable}
          />
        </p>
        <p>
          Details:
          <input
            type="text"
            className="item-input vendor-view-card-details"
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
        </div>
        <div className="available-container">
          <p>Available</p>
          <Switch
            onChange={handleChangeAvailable}
            checked={checkedAvailablehandleChangeAvailable}
            disabled={!isEditable}
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
          <button className="delete-item-btn" onClick={() => onDelete(id)}>
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorItemCard;
