import React, { useState, useEffect } from "react";
import "./CustomerDashboard.css";
import Header from "../Header/Header";
import NavigationBar from "../NavigationBar/NavigationBar";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { getSelectedVendorsItems } from "../../apiCalls";
import { postCustomerOrder } from "../../apiCalls";
import { updateItemQuantity } from "../../apiCalls";

type Vendor = {
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  location: string;
  market: number;
  vendor_name: string;
};

type CustomerDashboardProps = {
  allVendors: Vendor[];
};

const CustomerDash = ({ allVendors }: CustomerDashboardProps) => {
  console.log("CustomerDash allVendors: ", allVendors);

  const [selectedVendorId, setSelectedVendorId] = useState<number | null>(null);

  const vendors: string[] = allVendors.map((vendor) => {
    return vendor.vendor_name;
  });

  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
  const [selectedVendorObject, setSelectedVendorObject] =
    useState<Vendor | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedVendorsItems, setSelectedVendorsItems] = useState<
    selectedVendorItem[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (selectedVendorId !== null) {
      getSelectedVendorsItems(selectedVendorId)
        .then((data) => {
          setSelectedVendorsItems(data);
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [selectedVendorId]);

  console.log("CustomerDash selectedVendorsItems: ", selectedVendorsItems);

  console.log("CustomerDash selectedVendor: ", selectedVendor);

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
    if (selectedValue === "default") {
      setSelectedVendorId(null);
      setSelectedVendor(null);
      setSelectedVendorObject(null);
    } else {
      const foundVendorObject = allVendors.find(
        (vendor) => vendor.vendor_name === selectedValue
      );
      console.log("variable selectedVendor: ", foundVendorObject);
      if (foundVendorObject) {
        setSelectedVendorId(foundVendorObject.id);
        setSelectedVendor(selectedValue !== "default" ? selectedValue : null);
        setSelectedVendorObject(foundVendorObject);
        console.log("vendor id stored", selectedVendorId);
      }
    }
    // setSelectedVendor(selectedValue !== "default" ? selectedValue : null);
  };

  const selectedVendorsItemsCards =
    selectedVendorId !== null ? (
      selectedVendorsItems ? (
        selectedVendorsItems.map((item) => (
          item.availability && (
               <CustomerViewItemCard
            availability={item.availability}
            id={item.id}
            selectedVendorObject={selectedVendorObject}
            key={item.id}
            item_name={item.item_name}
            price={item.price}
            size={item.size}
            item_quantity={item.quantity}
            description={item.description}
          />
          )
       
        ))
      ) : (
        <p>No items available for the selected vendor.</p>
      )
    ) : (
      <p>Please select a vendor to view items.</p>
    );

  return (
    <div className="customer-container">
      <Header name="Sue" />
      <NavigationBar />
      <section className="customer-find-vendor">
        <input
          name="search-input"
          className="search-input"
          type="text"
          placeholder="Search for a vendor..."
          onChange={handleSearch}
        />
        <select
          name="select-input"
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
        {selectedVendorsItemsCards}
      </section>
    </div>
  );
};

type selectedVendorItem = {
  id: number;
  item_name: string;
  vendor: number;
  price: string;
  size: string;
  quantity: number;
  availability: boolean;
  description: string;
  image: string;
  date_created: string;
  updated_at: string;
};

type CustomerViewItemCardProps = {
  availability: boolean;
  id: number;
  item_name: string;
  price: string;
  size: string;
  item_quantity: number;
  description: string;
  selectedVendorObject: Vendor | null;
};

const CustomerViewItemCard = ({
  availability,
  id,
  item_name,
  price,
  size,
  item_quantity,
  description,
  selectedVendorObject,
}: CustomerViewItemCardProps) => {
  // DONE current date and time
  // DONE current Vendor info:  name and email
  // NEED SIGN IN INFO current Customer info:  name and email
  // DONE pick up date:
  // DONE pick up time:
  // DONE Item
  // DONE size
  // DONE description
  // DONE price
  // DONE quantity
  
  console.log(
    "CustomerViewItemCard selectedVendorObject: ",
    selectedVendorObject
  );

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  function handlePreOrderClick() {
    openModal();
  }
  const [serverQuantity, setServerQuantity] = useState<number>(item_quantity)
  const [requestedQuantity, setRequestedQuantity] = useState<number>(0);

  useEffect(() => {
    console.log('serverQuantity has changed:', serverQuantity)
    setServerQuantity(item_quantity)
  }, [item_quantity])

  const increaseQuantity = () => {
    setRequestedQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setRequestedQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0));
  };

  const [creditCard, setCreditCard] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreditCard((prev) => ({ ...prev, [name]: value }));
  };

  const currentDateTime: number = Date.now();
  console.log("currentDateTime: ", currentDateTime);

  const getNextSaturday = (orderDate: Date): Date => {
    const daysUntilSaturday = (6 - orderDate.getDay() + 7) % 7;
    const nextSaturdayDate = new Date(orderDate);
    nextSaturdayDate.setDate(orderDate.getDate() + daysUntilSaturday);
    return nextSaturdayDate;
  };

  const orderDate = new Date(currentDateTime);
  const nextSaturday = getNextSaturday(orderDate);

  const submitOrder = () => {
    alert("Order Confirmed!")

    const newOrder = {
      customer: 1,
      item: id,
      ready: true,
      quantity_requested: requestedQuantity,
    }

    console.log('CustomerDash newOrder: ', newOrder)
    
    postCustomerOrder(newOrder)
      .then(data => console.log(data))
      .catch(error => console.log(error))

    
    const newQuantity = {
      quantity: item_quantity - requestedQuantity
    }

    if (selectedVendorObject && selectedVendorObject.id) {
      updateItemQuantity(selectedVendorObject.id, id, newQuantity)
      .then(updatedItemData => {
        console.log('put quantityData: ', updatedItemData)
        setServerQuantity(newQuantity.quantity)
      })
      .catch(error => console.log(error))
    } else {
      console.log("Error: selectedVendorObject or its id is null.");
    }
    

    clearInputs()
  }

  const clearInputs = () => {
    setRequestedQuantity(0)
  }

  return (
    <>
      {selectedVendorObject !== null && availability === true ? (
        
        <div className="customer-view-item-card">
          <div className="customer-item-image">
            <img src="carrots.jpg" alt="Item" />
          </div>
          <div className="item-details">
            <p>
              Name: <span>{item_name}</span>
            </p>
            <p>
              Size: <span>{size}</span>
            </p>
            <p>
              Details: <span>{description}</span>
            </p>

            <p>
              Quantity Available: <span>{item_quantity}</span>
            </p>
            <div className="quantity-input">
              <button className="quantity-btn" onClick={decreaseQuantity}>
                -
              </button>
              <input
                className="quantity-num"
                value={requestedQuantity}
                onChange={(e) =>
                  setRequestedQuantity(Math.max(0, parseInt(e.target.value) || 0))
                }
              />
              <button className="quantity-btn" onClick={increaseQuantity}>
                +
              </button>
            </div>
            <button className="purchase-btn" onClick={handlePreOrderClick}>
              Pre-order
            </button>
          </div>
        </div>
      ) : ( null
      )}

      {isModalOpen && (
        <div className="modal" ref={componentRef}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2 className="invoice-header">
              Order Confirmation{" "}
              {/* <svg
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
              </svg> */}
            </h2>
            <p className="invoice-invoice-num">
              <strong>INVOICE #:</strong> 12
            </p>
            <div className="invoice-info">
              <p>
                <strong>Order Created at:</strong>{" "}
                {new Date(currentDateTime).toLocaleString()}
              </p>
              <p>
                <strong>Vendor:</strong>{" "}
                {selectedVendorObject
                  ? selectedVendorObject.vendor_name
                  : "N/A"}
              </p>
              <p>
                <strong>Vendor Contact:</strong>{" "}
                {selectedVendorObject ? selectedVendorObject.email : "N/A"}
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
                <strong>Pick Up Date:</strong> Saturday,{" "}
                {nextSaturday.toLocaleDateString()}
              </p>
              <p>
                <strong>Pick Up Time:</strong> 8am - 1pm
              </p>
              <p>
                <strong>Item:</strong> {item_name}
              </p>
              <p>
                <strong>Size:</strong> {size}
              </p>
              <p className="details-invoice">
                <strong>Details:</strong> {description}
              </p>
              <p>
                <strong>Price per Item:</strong> {price}
              </p>

              <p>
                <strong>Quantity:</strong> {requestedQuantity}
              </p>
            </div>
            <p className="invoice-total">
              <strong>Total:</strong>{" "}
              {price && requestedQuantity
                ? `$${(parseFloat(price) * requestedQuantity).toFixed(2)}`
                : "N/A"}
            </p>
            <div className="invoice-payment-info">
              <label>Card Number:</label>
              <input
                className="modal-input-cc"
                type="text"
                name="cardNumber"
                value={creditCard.cardNumber}
                onChange={handleInputChange}
              />
              <label>Expiration Date:</label>
              <input
                className="modal-input-cc-ex"
                type="text"
                name="expirationDate"
                value={creditCard.expirationDate}
                onChange={handleInputChange}
              />
              <label>CVV:</label>
              <input
                className="modal-input-cc-cvv"
                type="text"
                name="cvv"
                value={creditCard.cvv}
                onChange={handleInputChange}
              />
            </div>
            {/* alert("Order Confirmed!") */}
            <button
              className="order-confirm-btn"
              onClick={() => submitOrder()}
            >
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerDash;
