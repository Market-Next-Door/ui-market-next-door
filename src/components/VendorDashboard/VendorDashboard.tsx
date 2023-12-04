import React, { useState } from 'react';
import './VendorDashboard.css';
import Header from '../Header/Header';
import NavigationBar from '../NavigationBar/NavigationBar';
import VendorItemCard from '../VendorItemCard/VendorItemCard';

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

export default VendorDashboard;
