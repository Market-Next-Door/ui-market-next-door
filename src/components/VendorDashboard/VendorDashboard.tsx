import React, { useState } from 'react';
import './VendorDashboard.css';
import Header from '../Header/Header';
import NavigationBar from '../NavigationBar/NavigationBar';
import VendorItemCard from '../VendorItemCard/VendorItemCard';

export type VendorDashboardProps = {
  allVendors: string[] | number[];
  allItems: Item[];
};

type ItemAttributes = {
  item_name: string;
  vendor_name: string;
  price: number;
  quantity_available: number;
  size: string;
  available: boolean;
  description: string;
  img: string;
};

type Item = {
  attributes: ItemAttributes;
  id: number;
  type: string;
};

const VendorDashboard = ({ allVendors, allItems }: VendorDashboardProps) => {
  console.log('VendorDashboard allVendors: ', allVendors);
  console.log('VendorDashboard allItems:', allItems);

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
              item_name={item.attributes.item_name}
              vendor_name={item.attributes.vendor_name}
              price={item.attributes.price}
              quantity_available={item.attributes.quantity_available}
              size={item.attributes.size}
              available={item.attributes.available}
              description={item.attributes.description}
              img={item.attributes.img}
            />
          ))}
      </section>
    </div>
  );
};

export default VendorDashboard;
