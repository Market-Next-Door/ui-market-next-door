import React, { useState } from "react";
import "./VendorOrders.css";
import Header from "../Header/Header";
import NavigationBar from "../NavigationBar/NavigationBar";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import Switch from "react-switch";

function VendorOrders() {
  return (
    <div className="vendor-orders-container">
      <Header name='Sue'/>
      <NavigationBar />
      <div className="vendor-orders-display">
        <VendorOrderCard />
        <VendorOrderCard />
        <VendorOrderCard />
      </div>
    </div>
  );
}

function VendorOrderCard() {
  const [isModalOpen, setModalOpen] = useState(false);
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const [checkedPacked, setCheckedPacked] = useState(false);
  const [checkedFulfilled, setCheckedFulfilled] = useState(false);

  const handleChangePacked = (newChecked: boolean) => {
    setCheckedPacked(newChecked);
  };

  const handleChangeFulfilled = (newChecked: boolean) => {
    setCheckedFulfilled(newChecked);
  };
  return (
    <div className="vendor-view-orders-card-modal">
      <div className="vendor-view-orders-card">
        <div>
          <strong>Invoice #: </strong>12
        </div>
        <div>
          <strong>Order Recieved: </strong>12/11/2023 13:43
        </div>
        <div onClick={openModal} style={{ cursor: "pointer" }}>
          <strong>View/Print Details</strong>
        </div>
        <div className="status-container">
          <strong>Status: </strong>
          Past
        </div>
        <div className="status-container">
          <strong>Packed </strong>
          <Switch onChange={handleChangePacked} checked={checkedPacked} />
        </div>
        <div className="status-container">
          <strong>Fulfilled </strong>
          <Switch onChange={handleChangeFulfilled} checked={checkedFulfilled} />
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-invoice" ref={componentRef}>
          <div className="modal-content-invoice">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2 className="invoice-header">
              INVOICE{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="printer-icon"
                onClick={handlePrint}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
                />
              </svg>
            </h2>
            <p className="invoice-invoice-num">
              <strong>INVOICE #:</strong> 12
            </p>
            <div className="invoice-info">
              <p>
                <strong>Order Created at:</strong> Wednesday, December 4th, 2023
                13:44
              </p>
              <p>
                <strong>Vendor:</strong> Brian's Potatoes
              </p>
              <p>
                <strong>Vendor Contact:</strong> brianpotatoes@mail.com
              </p>
              <p>
                <strong>Customer:</strong> Ryan Spyin
              </p>
              <p>
                <strong>Customer Contact:</strong> ryanspyin@mail.com
              </p>
              <p>
                <strong>Market:</strong> Market Next Door
              </p>
              <p>
                <strong>Pick Up Date:</strong> Saturday December 12, 2023
              </p>
              <p>
                <strong>Pick Up Time:</strong> 10am - 2pm
              </p>
              <p>
                <strong>Item:</strong> Carrots
              </p>
              <p>
                <strong>Size:</strong> 5lb
              </p>
              <p className="details-invoice">
                <strong>Details:</strong> Small, crooked carrots Small, crooked
              </p>
              <p>
                <strong>Price per Item:</strong> $5.00
              </p>

              <p>
                <strong>Quantity:</strong> 2
              </p>
            </div>
            <p className="invoice-total">
              <strong>Total:</strong> $10.00{" "}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
export default VendorOrders;
