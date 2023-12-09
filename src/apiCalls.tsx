import { updatedItem } from './components/VendorItemCard/VendorItemCard';

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

export function postVendorItem(id: string, newItem: any) {
  return fetch(
    `https://quiet-depths-54407-77a00505f51e.herokuapp.com/vendors/${id}/items/`,
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

export function postCustomerOrder(newOrder: any, customerid: string) {
  return fetch(
    `https://quiet-depths-54407-77a00505f51e.herokuapp.com/customers/${customerid}/preorders/`,
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

export function postNewCustomer(newCustomer: any) {
  return fetch(
    'https://quiet-depths-54407-77a00505f51e.herokuapp.com/customers/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCustomer),
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

export function updateVendorItem(
  vendorid: string,
  id: number,
  updatedItem: updatedItem
) {
  return fetch(
    `https://quiet-depths-54407-77a00505f51e.herokuapp.com/vendors/${vendorid}/items/${id}/`,
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

export function deleteVendorItem(vendorid: string, id: number) {
  return fetch(
    `https://quiet-depths-54407-77a00505f51e.herokuapp.com/vendors/${vendorid}/items/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
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
  return fetch(
    `https://quiet-depths-54407-77a00505f51e.herokuapp.com/vendors/${vendorId}/items/${itemNum}/`,
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
