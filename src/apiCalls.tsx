import { updatedItem } from './types';

let url =
  process.env.REACT_APP_DEV_MODE === 'deployment'
    ? process.env.REACT_APP_DEVELOPEMENT_URL
    : process.env.REACT_APP_DEPLOYMENT_URL;

console.log('Using API URL:', url);

type ItemQuantity = {
  quantity: number;
};

// VENDOR apiCalls 👇
//v1 endpoint
// export function getAllVendors() {
//   return fetch(`${url}/api/v1/vendors/`).then(response => {
//     if (!response.ok) {
//       throw new Error(`${response.status} ${response.statusText}`);
//     }
//     return response.json();
//   });
// }

//v2 endpoint
export function getAllVendors() {
  return fetch(`${url}/api/v2/vendors/`).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

//v1 endpoint
// export function getOneVendor(vendorID: number) {
//   return fetch(`${url}/api/v1/vendors/${vendorID}`).then(response => {
//     if (!response.ok) {
//       throw new Error(`${response.status} ${response.statusText}`);
//     }
//     return response.json();
//   });
// }

//v2 endpoint
export function getOneVendor(vendorID: number) {
  return fetch(`${url}/api/v2/vendors/${vendorID}`).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

//v1 endpoint
// export function postNewVendor(newVendor: any) {
//   return fetch(`${url}/api/v1/vendors/`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(newVendor),
//   })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`${response.status} ${response.statusText}`);
//       }
//       return response;
//     })
//     .then(response => response.json());
// }

//v2 endpoint
export function postNewVendor(newVendor: any) {
  return fetch(`${url}/api/v2/vendors/`, {
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

export function updateVendorData(userID: number, updatedUserData: any) {
  console.log('userdata look', updatedUserData);
  return fetch(`${url}/api/v1/vendors/${userID}/`, {
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

export function deleteVendor(vendorID: number) {
  return fetch(`${url}/api/v1/vendors/${vendorID}/`, {
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

// CUSTOMER apiCalls 👇
//v1 endpoint
// export function getAllCustomers() {
//   return fetch(`${url}/api/v1/customers/`).then(response => {
//     if (!response.ok) {
//       throw new Error(`${response.status} ${response.statusText}`);
//     }
//     return response.json();
//   });
// }

//v2 endpoint
export function getAllCustomers() {
  return fetch(`${url}/api/v2/customers/`).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

//v1 endpoint
// export function getOneCustomer(customerID: number) {
//   return fetch(`${url}/api/v1/customers/${customerID}`).then(response => {
//     if (!response.ok) {
//       throw new Error(`${response.status} ${response.statusText}`);
//     }
//     return response.json();
//   });
// }

//v2 endpoint
export function getOneCustomer(customerID: number) {
  return fetch(`${url}/api/v2/customers/${customerID}`).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

//v1 endpoint
// export function postNewCustomer(newCustomer: any) {
//   return fetch(`${url}/api/v1/customers/`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(newCustomer),
//   })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`${response.status} ${response.statusText}`);
//       }
//       return response;
//     })
//     .then(response => response.json());
// }

//v2 endpoint
export function postNewCustomer(newCustomer: any) {
  return fetch(`${url}/api/v2/customers/`, {
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

export function updateCustomerData(userID: number, updatedUserData: any) {
  console.log('userdata look', updatedUserData);
  return fetch(`${url}/api/v1/customers/${userID}/`, {
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

export function deleteCustomer(customerID: number) {
  return fetch(`${url}/api/v1/customers/${customerID}/`, {
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

//ITEMS apiCalls 👇
export function getSelectedVendorsItems(id: number) {
  return fetch(`${url}/api/v1/vendors/${id}/items/`).then(response => {
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

  return fetch(`${url}/api/v1/vendors/${id}/items/`, {
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

export function updateVendorItem(
  vendorid: string,
  id: number,
  updatedItem: updatedItem
) {
  return fetch(`${url}/api/v1/vendors/${vendorid}/items/${id}/`, {
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

export function updateItemQuantity(
  vendorId: number,
  itemNum: number,
  newQuantity: ItemQuantity
) {
  return fetch(`${url}/api/v1/vendors/${vendorId}/items/${itemNum}/`, {
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

export function deleteVendorItem(vendorid: string, id: number) {
  return fetch(`${url}/api/v1/vendors/${vendorid}/items/${id}`, {
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

//ORDERS apiCalls 👇
export function getAllPreOrders() {
  return fetch(`${url}/api/v1/preorders`).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

export function getSelectedCustomerOrders(id: number) {
  return fetch(`${url}/api/v1/customers/${id}/preorders/`).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

export function getSelectedVendorOrders(id: number) {
  return fetch(`${url}/api/v1/vendors/${id}/preorders/`).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

export function postCustomerOrder(newOrder: any, customerid: string) {
  return fetch(`${url}/api/v1/customers/${customerid}/preorders/`, {
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

//MARKETS apiCalls 👇
export function getMarkets(zipcode: string, radius: string) {
  return fetch(`${url}/api/v1/markets/location/${zipcode}/${radius}/`).then(
    response => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response.json();
    }
  );
}
