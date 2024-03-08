//Types from CustomerDashboard

export type Vendor = {
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  location: string;
  market: number;
  vendor_name: string;
};

export type selectedVendorItem = {
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

export type CustomerDashboardProps = {
  selectedZipcode: string;
  selectedRadius: string;
  allVendors: Vendor[];
  isVendor: boolean;
  currentUserId: string;
};

export type CustomerViewItemCardProps = {
  availability: boolean;
  id: number;
  item_name: string;
  price: string;
  size: string;
  item_quantity: number;
  description: string;
  selectedVendorObject: Vendor | null;
  onUpdateQuantity: (itemId: number, updatedQuantity: number) => void;
  currentUser?: CurrentCustomer;
  image: string;
  setMessage: Function;
};

export type User = {
  first_name?: string;
};

export type CurrentCustomer = {
  first_name: string;
  email: string;
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
};

export type CustomerLoginProps = {
  allCustomers: Customer[];
  setIsVendor: Function;
  setCurrentUserId: Function;
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
