import React, { useState } from "react";
import "./CustomerDashboard.css";

const CustomerDash = () => {
  const vendors: string[] = ["Vendor A", "Vendor B", "Vendor C", "Vendor D"];

  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredVendors = vendors.filter((vendor) =>
    vendor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearchQuery(searchValue);
  };

  const handleVendorSelection = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setSelectedVendor(selectedValue !== "default" ? selectedValue : null);
  };

  return (
    <div className="customer-container">
      <header className="vendor-header">Welcome, Customer Name!</header>
      <nav className="vendor-nav">
        <button className="products btn">PRODUCTS</button>
        <button className="orders btn">ORDERS</button>
        <button className="settings btn">SETTINGS</button>
      </nav>
      <section className="customer-find-vendor">
        <input
          className="search-input"
          type="text"
          placeholder="Search for a vendor..."
          onChange={handleSearch}
        />
        <select
          className="select-input"
          value={selectedVendor || "default"}
          onChange={handleVendorSelection}
        >
          <option value="default">Select a vendor</option>
          {filteredVendors.map((vendor, index) => (
            <option key={index} value={vendor}>
              {vendor}
            </option>
          ))}
        </select>
        {selectedVendor && (
          <div>
            <p className="selected-vendor">Selected Vendor: {selectedVendor}</p>
          </div>
        )}
      </section>
      <section className="customer-view-items-display">
        <CustomerViewItemCard />
        <CustomerViewItemCard />
        <CustomerViewItemCard />
      </section>
    </div>
  );
};

const CustomerViewItemCard = () => {
  const [quantity, setQuantity] = useState<number>(0);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0));
  };
  return (
    <div className="customer-view-item-card">
      <div className="vendor-item-image">
        <img src="carrots.jpg" alt="Item" />
      </div>
      <div className="item-details">
        <p>
          Name: <span>Carrots</span>
        </p>
        <p>
          Size: <span>5lb</span>
        </p>
        <p>
          Details: <span>Small, crooked carrots</span>
        </p>

        <p>
          Quantity Available: <span>47</span>
        </p>
        <div className="quantity-input">
          <button className="quantity-btn" onClick={decreaseQuantity}>
            -
          </button>
          <input
            className="quantity-num"
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(0, parseInt(e.target.value) || 0))
            }
          />
          <button className="quantity-btn" onClick={increaseQuantity}>
            +
          </button>
        </div>
        <button
          className="purchase-btn"
          onClick={() => console.log("Purchased!")}
        >
          Pre-order
        </button>
      </div>
    </div>
  );
};

export default CustomerDash;
