//Types from CustomerDashboard

export type Vendor = {
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  location: string;
  market: number;
  vendor_name: string;
  password: string;
  default_zipcode: string;
};

export type selectedVendorItem = {
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

export type CustomerDashboardProps = {
  selectedZipcode: string;
  selectedRadius: string;
  allVendors: Vendor[];
  isVendor: boolean;
  currentUserId: string;
  currentUserObj: {
    id: string;
    first_name: string;
    last_name: string;
    zipcode: string;
    email: string;
    password: string;
  };
};

export type CustomerViewItemCardProps<T> = {
  availability: boolean;
  id: number;
  item_name: string;
  price: string;
  size: string;
  item_quantity: number;
  description: string;
  selectedVendorObject: Vendor | null;
  onUpdateQuantity: (itemId: number, updatedQuantity: number) => void;
  currentUser?: CurrentCustomer | null;
  image: string;
  setMessage: (message: string) => void;
};

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  zipcode: string;
  email: string;
  password: string;
}

export type CurrentCustomer = {
  first_name: string;
  email: string;
  zipcode: string;
};

//Types from CustomerLogin
export type Customer = {
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  location: string;
  market: number;
  vendor_name: string;
  password: string;
  default_zipcode: string;
};

export type CustomerLoginProps = {
  allCustomers: Customer[];
  setIsVendor: Function;
  setCurrentUserId: Function;
  selectedRadius: string;
  setCurrentUserObj: Function;
};

//Types from Customer Orders
export type VendorDetails = {
  email: string;
  vendor_name: string;
};

export type CustomerDetails = {
  email: string;
  first_name: string;
};

export type VendorItem = {
  id: number;
  item_name: string;
  size: string;
  description: string;
  price: string;
};

export type CustomerOrder = {
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

export type CustomerOrderCardProps = {
  key: number;
  data: {
    orderObj: CustomerOrder;
    vendorDetails: VendorDetails; // Update the type here
    customerDetails: CustomerDetails;
    vendorItems: VendorItem[];
  };
};

//Types from Customer Sign Up
export type newCustomer = {
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
  customerPassword: string;
  customerPasswordMatch: string;
};

export type CustomerSignUpProps = {
  addCustomer: Function;
};

//Types from ErrorPage
export type ErrorPageProps = {
  error: string;
  message: string;
};

//Types from Header
export type HeaderProps = {
  name: string;
  greeting?: string;
};

//Types from Map Component

//types needed for our state object
export type MarketProps = {
  market_name: string;
  address: string;
  website: string;
  phone: string;
  lat: string;
  lon: string;
};

export type selectedMarketProps = [
  {
    market_name: string;
    address: string;
    lat: string;
    lon: string;
    website: string;
    zipcode: string;
    phone: string;
  }
];

export type MapProps = {
  isVendor: boolean;
  currentUserId: string;
  addZipAndRadius: Function;
  selectedZipcode: string;
  selectedRadius: string;
};

export type MapConfigProps = {
  center: [number, number];
  zoom: number;
};

//Type from Navigation Bar
export type NavigationBarProps = {
  selectedZipcode: string;
  selectedRadius: string;
  isVendor: boolean;
  currentUserId: string;
  currentUserObj: User | null;
};

//Types from Vendor Dashboard
export type VendorParams = {
  vendorid: string;
};

export type VendorDashboardProps = {
  selectedZipcode: string;
  selectedRadius: string;
  allVendors: Vendor[];
  allItems: Item[];
  isVendor: boolean;
  setIsVendor: Function;
  setCurrentUserId: Function;
  currentUserId: string;
  setCurrentUserObj: Function;
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

//Types from Vendor Item Card
export type VendorItemCardProps = {
  id: number;
  item_name: string;
  vendor: string;
  price: string;
  quantity: number;
  size: string;
  availability: boolean;
  description: string;
  image: string;
  vendorid: string;
  onDelete: (id: number) => void;
};

export type updatedItem = {
  item_name: string;
  vendor: number;
  size: string;
  price: string;
  quantity: number;
  description: string;
  availability: boolean;
  image: File | null;
};

//Types from Vendor Orders
export type VendorOrderCardProps = {
  key: number;
  data: {
    orderObj: CustomerOrder;
    vendorDetails: VendorDetails;
    customerDetails: CustomerDetails;
    vendorItems: VendorItem[];
  };
};

// export type VendorDetails = {
//     email: string;
//     vendor_name: string;
//   };

// export type CustomerDetails = {
//     email: string;
//     first_name: string;
//   };

// export type VendorItem = {
//     id: number;
//     item_name: string;
//     size: string;
//     description: string;
//     price: string;
//   };

//   export type CustomerOrder = {
//     id: number;
//     customer: number;
//     item: number;
//     ready: boolean;
//     quantity_requested: number;
//     vendor_id: number;
//     date_created: string;
//     updated_at: string;
//     item_name: string;
//   };

//Types for Vendor Sign Up
export type VendorSignUpProps = {
  addVendor: Function;
};
