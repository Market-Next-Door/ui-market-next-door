import React from 'react';
import Switch from 'react-switch';
import './VendorItemCard.css';
import { useState } from 'react';
import { updateVendorItem } from '../../apiCalls';

type VendorItemCardProps = {
  id: number;
  item_name: string;
  vendor: string;
  price: string;
  quantity: number;
  size: string;
  availability: boolean;
  description: string;
  image: string;
};

export type updatedItem = {
  item_name: string;
  vendor: number;
  size: string;
  price: string;
  quantity: number;
  description: string;
  availability: boolean;
  image: File | null;
};

const VendorItemCard = ({
  item_name,
  vendor,
  price,
  quantity,
  size,
  availability,
  description,
  image,
}: VendorItemCardProps) => {
  console.log('VendorItemCard props:', {
    item_name,
    vendor,
    price,
    quantity,
    size,
    availability,
    description,
    image,
  });
  const [isChecked, setIsChecked] = useState(availability);
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const [itemName, setItemName] = useState<string>(item_name);
  const [itemSize, setItemSize] = useState<string>(size);
  const [itemDetails, setItemDetails] = useState<string>(description);
  const [quantityAvailable, setQuantityAvailable] = useState<number>(quantity);
  const [itemPrice, setItemPrice] = useState<string>(price);
  const [
    checkedAvailablehandleChangeAvailable,
    setCheckedAvailablehandleChangeAvailable,
  ] = useState(availability);

  const handleChangeAvailable = (newChecked: boolean) => {
    setCheckedAvailablehandleChangeAvailable(newChecked);
  };

  const handleEditToggle = () => {
    setIsEditable(!isEditable);
  };

  const handleSaveChanges = () => {
    const updatedItem: updatedItem = {
      item_name: itemName,
      vendor: 1,
      price: itemPrice,
      size: itemSize,
      quantity: quantityAvailable,
      availability: checkedAvailablehandleChangeAvailable,
      description: itemDetails,
      image: null,
    };
    setIsEditable(false);
    updateVendorItem(updatedItem)
      .then(data => console.log(data))
      .catch(error => console.log(error));
  };

  return (
    <div className="vendor-item-card">
      <div className="vendor-item-image">
        <img src={image} alt={itemName} />
      </div>
      <div className="item-details">
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
          <button className="delete-item-btn">X</button>
        </div>
      </div>
    </div>
  );
};

export default VendorItemCard;
