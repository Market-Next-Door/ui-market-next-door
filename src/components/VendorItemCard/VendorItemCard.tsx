import React from 'react';
import Switch from 'react-switch';
import './VendorItemCard.css';
import { useState } from 'react';

type VendorItemCardProps = {
  item_name: string;
  vendor_name: string;
  price: number;
  quantity_available: number;
  size: string;
  available: boolean;
  description: string;
  img: string;
};

const VendorItemCard = ({
  item_name,
  vendor_name,
  price,
  quantity_available,
  size,
  available,
  description,
  img,
}: VendorItemCardProps) => {
  console.log('VendorItemCard props:', {
    item_name,
    vendor_name,
    price,
    quantity_available,
    size,
    available,
    description,
    img,
  });
  const [isChecked, setIsChecked] = useState(available);
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const handleToggleAvailable = (newChecked: boolean) => {
    setIsChecked(newChecked);
  };

  const handleEditToggle = () => {
    setIsEditable(!isEditable);
  };

  const handleSaveChanges = () => {
    setIsEditable(false);
    // Here, you might want to save changes to the server or parent component
  };

  return (
    <div className="vendor-item-card">
      <div className="vendor-item-image">
        <img src={img} alt={item_name} />
      </div>
      <div className="item-details">
        <p>
          Name:
          <input
            className="item-input"
            value={item_name}
            // onChange={e => setItemName(e.target.value)}
            readOnly={!isEditable}
          />
        </p>
        <p>
          Size:
          <input
            className="item-input"
            value={size}
            // onChange={e => setItemSize(e.target.value)}
            readOnly={!isEditable}
          />
        </p>
        <p>
          Price:
          <input
            className="item-input"
            value={price}
            // onChange={e => setItemPrice(parseInt(e.target.value))}
            readOnly={!isEditable}
          />
        </p>
        <p>
          Details:
          <input
            className="item-input"
            value={description}
            // onChange={e => setItemDetails(e.target.value)}
            readOnly={!isEditable}
          />
        </p>
        <div className="quantity-container">
          <p>
            Quantity Available:
            <input
              className="item-input"
              type="number"
              value={quantity_available}
              //   onChange={e => setQuantityAvailable(Number(e.target.value))}
              readOnly={!isEditable}
            />
          </p>
          {/* <p>Quantity Ordered: 3 </p> */}
        </div>
        <div className="available-container">
          <p>Available</p>
          {/* <Switch
            onChange={handleChangeAvailable}
            checked={checkedAvailablehandleChangeAvailable}
          /> */}
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
