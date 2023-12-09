import React, { useState, useRef, useEffect } from 'react';
import './VendorDashboard.css';
import Header from '../Header/Header';
import NavigationBar from '../NavigationBar/NavigationBar';
import VendorItemCard from '../VendorItemCard/VendorItemCard';
import {
  getSelectedVendorsItems,
  postVendorItem,
  deleteVendorItem,
} from '../../apiCalls';

import { Vendor } from '../VendorLogIn/VendorLogIn';
import { useParams } from 'react-router';

type VendorParams = {
  vendorid: string;
};

export type VendorDashboardProps = {
  allVendors: Vendor[];
  allItems: Item[];
  isVendor: boolean;
  setIsVendor: Function;
  setCurrentUserId: Function;
  currentUserId: string;
};

export type Item = {
  id: number;
  item_name: string;
  vendor: number;
  price: string;
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
  price: string;
  quantity: number;
  description: string;
  availability: boolean;
  image: File | null;
  id: string;
};

type selectedVendorItem = {
  id: number;
  item_name: string;
  vendor: string;
  price: string;
  size: string;
  quantity: number;
  availability: boolean;
  description: string;
  image: string;
  date_created: string;
  updated_at: string;
};
const VendorDashboard = ({
  allItems,
  allVendors,
  isVendor,
  setIsVendor,
  currentUserId,
}: VendorDashboardProps) => {
  const { vendorid } = useParams<VendorParams>();
  console.log(vendorid, 'vendorid');

  console.log('VendorDashboard allItems:', allItems);
  console.log('VendorDashboard allVendors', allVendors);

  const [addItemName, setAddItemName] = useState<string>();
  const [addItemSize, setAddItemSize] = useState<string>();
  const [addItemDetails, setAddItemDetails] = useState<string>();
  const [addQuantityAvailable, setAddQuantityAvailable] = useState<number>();
  const [addItemPrice, setAddItemPrice] = useState<string>();
  const [addItemFile, setAddItemFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function addItem(newItem: NewItem) {
    if (vendorid) {
      // Check if vendorId is not null
      postVendorItem(vendorid, newItem)
        .then(data => {
          console.log('newItem:POST data', data);
          setSelectedVendorsItems([...selectedVendorsItems, data]);
        })
        .catch(error => {
          console.error('Error posting new item:', error);
        });
    } else {
      console.error('Vendor ID is not available.');
    }
  }

  function submitItem(event: React.FormEvent) {
    event.preventDefault();
    const newItem: NewItem = {
      id: vendorid ?? '',
      item_name: addItemName || '',
      vendor: vendorid ?? '',
      price: addItemPrice || '',
      size: addItemSize || '',
      quantity: addQuantityAvailable || 0,
      availability: true,
      description: addItemDetails || '',
      image: addItemFile || null, // Handle image as needed
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
    setAddItemPrice('');
    setAddItemDetails('');
    setAddQuantityAvailable(0);
    setAddItemFile(null);
  }

  const selectedVendorId = vendorid;
  console.log('vendor id check', selectedVendorId);

  const [selectedVendorsItems, setSelectedVendorsItems] = useState<
    selectedVendorItem[]
  >([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (selectedVendorId !== undefined && selectedVendorId !== null) {
      getSelectedVendorsItems(Number(selectedVendorId))
        .then(data => {
          setSelectedVendorsItems(data);
          setIsLoading(false);
        })
        .catch(error => console.log(error));
    }
  }, [selectedVendorId]);

  const deleteItem = (id: number) => {
    if (vendorid) {
      deleteVendorItem(vendorid, id)
        .then(() => {
          const updatedItems = selectedVendorsItems.filter(
            item => item.id !== id
          );
          setSelectedVendorsItems(updatedItems);
        })
        .catch(error => {
          console.error('Error deleting item:', error);
        });
    } else {
      console.error('Vendor ID is not available for deletion.');
    }
  };

  return (
    <div className="vendor-container">
      <Header name="Sue" />
      <NavigationBar isVendor={isVendor} currentUserId={currentUserId} />
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
          onChange={event => setAddItemPrice(event.target.value)}
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
        {selectedVendorsItems &&
          selectedVendorsItems.map(item => (
            <VendorItemCard
              id={item.id}
              key={item.id}
              item_name={item.item_name}
              vendor={item.vendor}
              price={item.price}
              quantity={item.quantity}
              size={item.size}
              availability={item.availability}
              description={item.description}
              image={item.image}
              vendorid={vendorid || ''}
              onDelete={deleteItem}
            />
          ))}
      </section>
    </div>
  );
};

export default VendorDashboard;
