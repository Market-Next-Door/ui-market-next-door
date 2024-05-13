import React, { useState, useRef, useEffect } from 'react';
import './VendorDashboard.css';
import Header from '../Header/Header';
import NavigationBar from '../NavigationBar/NavigationBar';
import VendorItemCard from '../VendorItemCard/VendorItemCard';
import {
  getSelectedVendorsItems,
  postVendorItem,
  deleteVendorItem,
  getOneVendor,
} from '../../apiCalls';
import { useParams } from 'react-router';
import ErrorPage from '../ErrorPage/ErrorPage';
import {
  VendorParams,
  VendorDashboardProps,
  NewItem,
  selectedVendorItem,
  User,
} from '../../types';

const VendorDashboard = ({
  selectedZipcode,
  selectedRadius,
  isVendor,
  currentUserId,
  updateZipcode,
}: VendorDashboardProps) => {
  const { vendorid } = useParams<VendorParams>();
  const [addItemName, setAddItemName] = useState<string>();
  const [addItemSize, setAddItemSize] = useState<string>();
  const [addItemDetails, setAddItemDetails] = useState<string>();
  const [addQuantityAvailable, setAddQuantityAvailable] = useState<number>();
  const [addItemPrice, setAddItemPrice] = useState<string>();
  const [addItemFile, setAddItemFile] = useState<File | null>(null);
  const [vendorDashError, setVendorDashError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  function addItem(newItem: NewItem) {
    if (
      !addItemName ||
      !addItemPrice ||
      !addItemSize ||
      !addQuantityAvailable ||
      !addItemDetails ||
      !addItemFile
    ) {
      window.alert('Please fill in all the fields!');
      return;
    }

    if (vendorid) {
      // Check if vendorId is not null
      postVendorItem(vendorid, newItem)
        .then(data => {
          setSelectedVendorsItems([...selectedVendorsItems, data]);
        })
        .catch(error => {
          setVendorDashError(error.message);
        });
    } else {
      console.error('Vendor ID is not available.');
    }
  }
  // type User = {
  //   first_name?: string;
  // };
  const [currentUserObj, setCurrentUserObj] = useState<User>({
    id: '',
    first_name: '',
    last_name: '',
    zipcode: '',
    default_zipcode: '',
    email: '',
    password: '',
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (vendorid !== undefined) {
  //         const result = await getOneVendor(parseInt(vendorid));
  //         setCurrentUserObj(result);
  //       }
  //     } catch (error: any) {
  //       console.error('Error fetching data:', error);
  //       setVendorDashError(error.message);
  //     }
  //   };

  //   fetchData();
  // }, [vendorid]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (vendorid !== undefined) {
          const result = await getOneVendor(parseInt(vendorid));
          setCurrentUserObj(result);
          console.log('currentUserObj:', result);
        }
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setVendorDashError(error.message);
      }
    };

    fetchData();
  }, [vendorid]);

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
        .catch(error => setVendorDashError(error.message));
    }
  }, [selectedVendorId]);

  const deleteItem = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item? This action can't be undone."
    );

    if (confirmed) {
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
            setVendorDashError(error.message);
          });
      } else {
        console.error('Vendor ID is not available for deletion.');
      }
    }
  };

  function getCurrentWeekDates() {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const startDate = new Date(currentDate);
    startDate.setDate(
      currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1)
    );

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    const startDateString = startDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    const endDateString = endDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    return `INVENTORY FOR THE WEEK OF ${startDateString} - ${endDateString}`;
  }

  const dynamicDateLine = getCurrentWeekDates();

  return vendorDashError ? (
    <ErrorPage
      error={vendorDashError}
      message="We're experiencing server issues.  Please try again later."
    />
  ) : (
    <div className="vendor-container">
      {currentUserObj?.first_name && (
        <Header greeting="Welcome" name={currentUserObj.first_name} />
      )}
      <NavigationBar
        selectedZipcode={selectedZipcode}
        selectedRadius={selectedRadius}
        isVendor={isVendor}
        currentUserId={currentUserId}
        currentUserObj={currentUserObj}
        showNavbar={true}
        updateZipcode={updateZipcode}
        setCurrentUserObj={setCurrentUserObj}
      />
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
        {dynamicDateLine.toUpperCase()}
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
