import React, { useEffect, useState } from "react";
import "./VendorOrders.css";
import Header from "../Header/Header";
import NavigationBar from "../NavigationBar/NavigationBar";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import Switch from "react-switch";
import { getSelectedVendorOrders } from "../../apiCalls";
import { getOneCustomer } from "../../apiCalls";
import { getOneVendor } from "../../apiCalls";
import { getSelectedVendorsItems } from "../../apiCalls";

type VendorOrderCardProps = {
  key: number;
  data: {
    orderObj: CustomerOrder;
    vendorDetails: VendorDetails;
    customerDetails: CustomerDetails;
    vendorItems: VendorItem[];
  };
};
type VendorDetails = {
  email: string;
  vendor_name: string;
};

type CustomerDetails = {
  email: string;
  first_name: string;
};

type VendorItem = {
  id: number;
  item_name: string;
  size: string;
  description: string;
  price: string;
};

type CustomerOrder = {
  id: number;
  customer: number;
  item: number;
  ready: boolean;
  quantity_requested: number;
  vendor_id: number;
  date_created: string;
  updated_at: string;
  item_name: string;
};

function VendorOrders() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVendorOrders, setSelectedVendorOrders] = useState<
    {
      orderObj: CustomerOrder;
      vendorDetails: VendorDetails;
      customerDetails: CustomerDetails;
      vendorItems: VendorItem[]; // Fix: Initialize as an empty array
    }[]
  >([]);

  const selectedCustomerId = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await getSelectedVendorOrders(selectedCustomerId);

        // Fetch additional data for each order
        const orderVendorCustomerDetails = await Promise.all(
          ordersData.map(async (order: CustomerOrder) => {
            const vendorDetails = await getOneVendor(order.vendor_id);
            const customerDetails = await getOneCustomer(order.customer);
            const vendorItems = await getSelectedVendorsItems(order.vendor_id);
            const orderObj = order;

            return {
              ...order,
              vendorDetails,
              customerDetails,
              vendorItems,
              orderObj,
            };
          })
        );

        setSelectedVendorOrders(orderVendorCustomerDetails);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching order details:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedCustomerId]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="vendor-orders-container">
      <Header name="Sue" />
      <NavigationBar />
      <div className="vendor-orders-display">
        {selectedVendorOrders.map((orderData) => {
          // console.log("Order Data:", orderData);
          return (
            <VendorOrderCard key={orderData.orderObj?.id} data={orderData} />
          );
        })}
      </div>
    </div>
  );
}

function VendorOrderCard({ data }: VendorOrderCardProps) {
  const order = data.orderObj;
  const vendorDetails = data.vendorDetails;
  const customerDetails = data.customerDetails;
  const vendorItems = data.vendorItems;

  const orderedItem = vendorItems.find((vendorItem) => {
    return vendorItem.id === order.item;
  });

  const itemName = orderedItem ? orderedItem.item_name : "Unknown Item";

  const itemSize = orderedItem ? orderedItem.size : "Unknown Size";

  const itemDetails = orderedItem
    ? orderedItem.description
    : "Unknown description";

  const itemPrice = orderedItem ? orderedItem.price : "Unknown Price";

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

  const orderDate = new Date(order.date_created);
  const getNextSaturday = (orderDate: Date): Date => {
    const daysUntilSaturday = (6 - orderDate.getDay() + 7) % 7;
    const nextSaturdayDate = new Date(orderDate);
    nextSaturdayDate.setDate(orderDate.getDate() + daysUntilSaturday);
    return nextSaturdayDate;
  };
  const nextSaturday = getNextSaturday(orderDate);
  const isUpcoming = nextSaturday > new Date();
  return (
    <div className="vendor-view-orders-card-modal">
      <div className="vendor-view-orders-card">
        <div>
          <strong>Invoice #: </strong>
          {order.id}
        </div>
        <div>
          <strong>Order Recieved: </strong>{" "}
          {new Date(order.date_created).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          })}
        </div>
        <div onClick={openModal} style={{ cursor: "pointer" }}>
          <strong>View/Print Details</strong>
        </div>
        <div className="status-container">
          <strong>Status: </strong>
          {isUpcoming ? "Upcoming" : "Past"}
        </div>
        <div className="status-container">
          <strong>Packed: </strong>
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
              <strong>INVOICE #:</strong> {order.id}
            </p>
            <div className="invoice-info">
              <p>
                <strong>Order Created at:</strong>{" "}
                {new Date(order.date_created).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                })}
              </p>
              <p>
                <strong>Vendor:</strong> {vendorDetails.vendor_name}
              </p>
              <p>
                <strong>Vendor Contact:</strong> {vendorDetails.email}
              </p>
              <p>
                <strong>Customer:</strong> {customerDetails.first_name}
              </p>
              <p>
                <strong>Customer Contact:</strong> {customerDetails.email}
              </p>
              <p>
                <strong>Market:</strong> Market Next Door
              </p>
              <p>
                <strong>Pick Up Date:</strong>{" "}
                {nextSaturday.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p>
                <strong>Pick Up Time:</strong> 8am - 12pm
              </p>
              <p>
                <strong>Item:</strong> {itemName}
              </p>
              <p>
                <strong>Size:</strong> {itemSize}
              </p>
              <p className="details-invoice">
                <strong>Details:</strong>
                {itemDetails}
              </p>
              <p>
                <strong>Price per Item:</strong> ${itemPrice}
              </p>

              <p>
                <strong>Quantity:</strong> {order.quantity_requested}
              </p>
            </div>
            <p className="invoice-total">
              <strong>Total:</strong>{" "}
              {(order.quantity_requested * parseFloat(itemPrice)).toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
export default VendorOrders;
