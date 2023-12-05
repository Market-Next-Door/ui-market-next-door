import React, { useState } from 'react';
import './VendorDashboard.css';
import Header from '../Header/Header';
import NavigationBar from '../NavigationBar/NavigationBar';
import VendorItemCard from '../VendorItemCard/VendorItemCard';

export type VendorDashboardProps = {
  allVendors: string[] | number[];
  allItems: Item[];
};

type Item = {
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

const VendorDashboard = ({ allItems, allVendors }: VendorDashboardProps) => {
  console.log('VendorDashboard allItems:', allItems);
  console.log('VendorDashboard allVendors', allVendors);

  return (
    <div className="vendor-container">
      <Header name="Sue" />
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
