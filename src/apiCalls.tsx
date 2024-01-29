import { updatedItem } from './components/VendorItemCard/VendorItemCard';

let url =
  process.env.REACT_APP_DEV_MODE === 'deployment'
    ? process.env.REACT_APP_DEVELOPEMENT_URL
    : process.env.REACT_APP_DEPLOYMENT_URL;

type ItemQuantity = {
  quantity: number;
};

export function getAllVendors() {
  return fetch(`${url}/vendors/`).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

export function getAllCustomers() {
  return fetch(`${url}/customers/`).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

export function getAllPreOrders() {
  return fetch(`${url}/preorders`).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

export function getSelectedVendorsItems(id: number) {
  return fetch(`${url}/vendors/${id}/items/`).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

export function postVendorItem(id: string, newItem: any) {
  const formData = new FormData();
  for (const name in newItem) {
    formData.append(name, newItem[name]);
  }

  return fetch(`${url}/vendors/${id}/items/`, {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response;
    })
    .then(response => response.json());
}

export function getOneVendor(vendorID: number) {
  return fetch(`${url}/vendors/${vendorID}`).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

export function getOneCustomer(customerID: number) {
  return fetch(`${url}/customers/${customerID}`).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

export function postCustomerOrder(newOrder: any, customerid: string) {
  return fetch(`${url}/customers/${customerid}/preorders/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newOrder),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response;
    })
    .then(response => response.json());
}

export function getSelectedCustomerOrders(id: number) {
  return fetch(`${url}/customers/${id}/preorders/`).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

export function postNewCustomer(newCustomer: any) {
  return fetch(`${url}/customers/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCustomer),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response;
    })
    .then(response => response.json());
}
export function postNewVendor(newVendor: any) {
  return fetch(`${url}/vendors/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newVendor),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response;
    })
    .then(response => response.json());
}

export function getSelectedVendorOrders(id: number) {
  return fetch(`${url}/vendors/${id}/preorders/`).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

export function getMarkets(zipcode: string, radius: string) {
  return fetch(
    `https://quiet-depths-54407-77a00505f51e.herokuapp.com/markets/location/${zipcode}/${radius}`
  ).then(response => {
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
  return fetch(`${url}/vendors/${vendorid}/items/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedItem),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response;
    })
    .then(response => response.json());
}

export function deleteVendorItem(vendorid: string, id: number) {
  return fetch(`${url}/vendors/${vendorid}/items/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response.json();
    })

    .catch(error => console.log(error));
}

export function updateItemQuantity(
  vendorId: number,
  itemNum: number,
  newQuantity: ItemQuantity
) {
  return fetch(`${url}/vendors/${vendorId}/items/${itemNum}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newQuantity),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response;
    })
    .then(response => response.json());
}

export function deleteVendor(vendorID: number) {
  return fetch(`${url}/vendors/${vendorID}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response;
    })
    .catch(error => console.log(error));
}

export function deleteCustomer(customerID: number) {
  return fetch(`${url}/customers/${customerID}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response;
    })
    .catch(error => console.log(error));
}

export function updateCustomerData(userID: number, updatedUserData: any) {
  console.log('userdata look', updatedUserData);
  return fetch(`${url}/customers/${userID}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedUserData),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .catch(error => console.log(error));
}

export function updateVendorData(userID: number, updatedUserData: any) {
  console.log('userdata look', updatedUserData);
  return fetch(`${url}/vendors/${userID}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedUserData),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .catch(error => console.log(error));
}
