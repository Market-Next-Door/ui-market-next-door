import React, { useState, useRef } from 'react';
import './VendorDashboard.css';
import Header from '../Header/Header';
import NavigationBar from '../NavigationBar/NavigationBar';
import VendorItemCard from '../VendorItemCard/VendorItemCard';

export type VendorDashboardProps = {
  allVendors: string[] | number[];
  allItems: Item[];
  addItem: (newItem: NewItem) => void;
};

export type Item = {
  id: number;
  item_name: string;
  vendor: string;
  price: number;
  quantity: number;
  size: string;
  availability: boolean;
  description: string;
  image: string;
};

export type NewItem = {
  item_name: string;
  vendor: string;
  size: string;
  price: number;
  quantity: number;
  description: string;
  availability: boolean;
  image: string;
};

const VendorDashboard = ({
  allItems,
  allVendors,
  addItem,
}: VendorDashboardProps) => {
  console.log('VendorDashboard allItems:', allItems);
  console.log('VendorDashboard allVendors', allVendors);

  const [addItemName, setAddItemName] = useState<string>();
  const [addItemSize, setAddItemSize] = useState<string>();
  const [addItemDetails, setAddItemDetails] = useState<string>();
  const [addQuantityAvailable, setAddQuantityAvailable] = useState<number>();
  const [addItemPrice, setAddItemPrice] = useState<number>();
  const [addItemFile, setAddItemFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function submitItem(event: React.FormEvent) {
    event.preventDefault();
    const newItem: NewItem = {
      item_name: addItemName || '',
      vendor: 'DefaultVendor', //this should load our current vendor
      size: addItemSize || '',
      price: addItemPrice || 0,
      quantity: addQuantityAvailable || 0,
      description: addItemDetails || '',
      availability: true,
      image: '', // Handle image as needed
    };

    addItem(newItem);
    clearInputs();
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setAddItemFile(event.target.files[0]);
    } else {
      setAddItemFile(null); // Clear the file if the user deselects
    }
  };

  function clearInputs() {
    //reset the form-check if formRef.current is not null before resetting
    if (formRef.current) {
      formRef.current.reset();
    }
    setAddItemName('');
    setAddItemSize('');
    setAddItemPrice(0);
    setAddItemDetails('');
    setAddQuantityAvailable(0);
    setAddItemFile(null);
  }

  return (
    <div className="vendor-container">
      <Header name="Sue" />
      <NavigationBar />
      <form className="add-item-form" ref={formRef}>
        <input
          className="add-item-item-name"
          name="add-item-name"
          type="text"
          placeholder="Item Name..."
          value={addItemName}
          onChange={event => setAddItemName(event.target.value)}
        />

        <input
          className="add-item-item-size"
          name="add-item-size"
          type="text"
          placeholder="Size..."
          value={addItemSize}
          onChange={event => setAddItemSize(event.target.value)}
        />
        <input
          className="add-item-item-price"
          name="add-item-price"
          type="number"
          placeholder="Price..."
          value={addItemPrice}
          onChange={event => setAddItemPrice(parseFloat(event.target.value))}
        />
        <input
          className="add-item-item-quantity"
          name="add-item-quantity"
          type="text"
          placeholder="Quantity Available..."
          value={addQuantityAvailable}
          onChange={event =>
            setAddQuantityAvailable(parseFloat(event.target.value))
          }
        />
        <input
          className="add-item-item-notes"
          name="add-item-notes"
          type="text"
          placeholder="Details..."
          value={addItemDetails}
          onChange={event => setAddItemDetails(event.target.value)}
        />
        <label htmlFor="files">upload photo</label>
        <input
          className="add-item-file"
          name="add-item-file"
          type="file"
          id="files"
          onChange={handleFileChange}
        />

        <button className="post-btn" onClick={event => submitItem(event)}>
          ADD ITEM
        </button>
      </form>
      <p
        style={{ paddingLeft: '3rem', fontSize: '1.4rem', fontWeight: 'bold' }}
      >
        INVENTORY FOR THE WEEK OF MON DEC 10 2023 - SUN DEC 17 2023{' '}
      </p>
      <section className="vendor-items-display">
        {allItems &&
          allItems.map(item => (
            <VendorItemCard
              key={item.id}
              item_name={item.item_name}
              vendor={item.vendor}
              price={item.price}
              quantity={item.quantity}
              size={item.size}
              availability={item.availability}
              description={item.description}
              image={item.image}
            />
          ))}
      </section>
    </div>
  );
};

export default VendorDashboard;
