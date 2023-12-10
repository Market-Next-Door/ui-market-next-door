import { updatedItem } from "./components/VendorItemCard/VendorItemCard";

type ItemQuantity = {
  quantity: number;
};

export function getAllVendors() {
  return fetch(
    "http://127.0.0.1:8000/vendors/"
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

export function getAllCustomers() {
  return fetch(
    "http://127.0.0.1:8000/customers/"
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

export function getAllPreOrders() {
  return fetch(
    "http://127.0.0.1:8000/preorders"
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

export function getSelectedVendorsItems(id: number) {
  return fetch(
    `http://127.0.0.1:8000/vendors/${id}/items/`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

export function postVendorItem(id: string, newItem: any) {
  return fetch(
    `http://127.0.0.1:8000/vendors/${id}/items/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response;
    })
    .then((response) => response.json());
}

export function getOneVendor(vendorID: number) {
  return fetch(
    `http://127.0.0.1:8000/vendors/${vendorID}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

export function getOneCustomer(customerID: number) {
  return fetch(
    `http://127.0.0.1:8000/customers/${customerID}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

export function postCustomerOrder(newOrder: any, customerid: string) {
  return fetch(
    `http://127.0.0.1:8000/customers/${customerid}/preorders/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response;
    })
    .then((response) => response.json());
}

export function getSelectedCustomerOrders(id: number) {
  return fetch(
    `http://127.0.0.1:8000/customers/${id}/preorders/`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

export function postNewCustomer(newCustomer: any) {
  return fetch(
    "http://127.0.0.1:8000/customers/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCustomer),
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response;
    })
    .then((response) => response.json());
}
export function postNewVendor(newVendor: any) {
  return fetch(
    "http://127.0.0.1:8000/vendors/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVendor),
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response;
    })
    .then((response) => response.json());
}

export function getSelectedVendorOrders(id: number) {
  return fetch(
    `http://127.0.0.1:8000/vendors/${id}/preorders/`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

export function updateVendorItem(
  vendorid: string,
  id: number,
  updatedItem: updatedItem
) {
  return fetch(
    `http://127.0.0.1:8000/vendors/${vendorid}/items/${id}/`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response;
    })
    .then((response) => response.json());
}

export function deleteVendorItem(vendorid: string, id: number) {
  return fetch(
    `http://127.0.0.1:8000/vendors/${vendorid}/items/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response.json();
    })

    .catch((error) => console.log(error));
}

export function updateItemQuantity(
  vendorId: number,
  itemNum: number,
  newQuantity: ItemQuantity
) {
  return fetch(
    `http://127.0.0.1:8000/vendors/${vendorId}/items/${itemNum}/`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuantity),
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response;
    })
    .then((response) => response.json());
}
