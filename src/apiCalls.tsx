type ItemQuantity = {
  quantity: number;
};

export function getAllVendors() {
  return fetch(
    'https://quiet-depths-54407-77a00505f51e.herokuapp.com/vendors/'
  ).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

export function getAllCustomers() {
  return fetch(
    'https://quiet-depths-54407-77a00505f51e.herokuapp.com/customers/'
  ).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

// export function getAllItems(vendorId) {
//   return fetch(`https://quiet-depths-54407-77a00505f51e.herokuapp.com/vendors/${vendorId}/items`)
//   .then(response => {
//     if(!response.ok) {
//       throw new Error(`${response.status} ${response.statusText}`)
//     }
//     return response.json()
//   })
// }

export function getAllPreOrders() {
  return fetch(
    'https://quiet-depths-54407-77a00505f51e.herokuapp.com/preorders'
  ).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

export function getSelectedVendorsItems(id: number) {
  return fetch(
    `https://quiet-depths-54407-77a00505f51e.herokuapp.com/vendors/${id}/items/`
  ).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

export function postVendorItem(newItem: any) {
  return fetch(
    'https://quiet-depths-54407-77a00505f51e.herokuapp.com/vendors/1/items/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    }
  )
    .then(response => {
      if (!response.ok) {
        throw new Error('Uh oh, we apologize ANN, something went wrong');
      }
      return response;
    })
    .then(response => response.json());
}

export function getOneVendor(vendorID: number) {
  return fetch(
    `https://quiet-depths-54407-77a00505f51e.herokuapp.com/vendors/${vendorID}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

export function getOneCustomer(customerID: number) {
  return fetch(
    `https://quiet-depths-54407-77a00505f51e.herokuapp.com/customers/${customerID}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

export function postCustomerOrder(newOrder: any) {
  return fetch(
    'https://quiet-depths-54407-77a00505f51e.herokuapp.com/customers/1/preorders/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newOrder),
    }
  )
    .then(response => {
      if (!response.ok) {
        throw new Error('Uh oh, we apologize, something went wrong');
      }
      return response;
    })
    .then(response => response.json());
}

export function getSelectedCustomerOrders(id: number) {
  return fetch(
    `https://quiet-depths-54407-77a00505f51e.herokuapp.com/customers/${id}/preorders/`
  ).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

export function getSelectedVendorOrders(id: number) {
  return fetch(
    `https://quiet-depths-54407-77a00505f51e.herokuapp.com/vendors/${id}/preorders/`
  ).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

export function updateVendorItem(updatedItem: any) {
  return fetch(
    'https://quiet-depths-54407-77a00505f51e.herokuapp.com/vendors/1/items/1',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    }
  )
    .then(response => {
      if (!response.ok) {
        throw new Error('Uh oh, we apologize ANN, something went wrong');
      }
      return response;
    })
    .then(response => response.json());
}
export function updateItemQuantity(newQuantity: ItemQuantity) {
  return fetch(
    'https://quiet-depths-54407-77a00505f51e.herokuapp.com/vendors/1/items/1',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newQuantity),
    }
  )
    .then(response => {
      if (!response.ok) {
        throw new Error('Uh oh, we apologize ANN, something went wrong');
      }
      return response;
    })
    .then(response => response.json());
}
