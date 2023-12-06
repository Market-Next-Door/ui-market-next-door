export function getAllVendors() {
  return fetch('https://quiet-depths-54407-77a00505f51e.herokuapp.com/vendors')
  .then(response => {
    if(!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`)
    }
    return response.json()
  })
}

export function getAllCustomers() {
  return fetch('https://quiet-depths-54407-77a00505f51e.herokuapp.com/customers')
  .then(response => {
    if(!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`)
    }
    return response.json()
  })
}

export function getAllItems() {
  return fetch('https://quiet-depths-54407-77a00505f51e.herokuapp.com/items')
  .then(response => {
    if(!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`)
    }
    return response.json()
  })
}

export function getAllPreOrders() {
  return fetch('https://quiet-depths-54407-77a00505f51e.herokuapp.com/preorders')
  .then(response => {
    if(!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`)
    }
    return response.json()
  })
}

export function getSelectedVendorsItems(id: number) {
  return fetch(`https://quiet-depths-54407-77a00505f51e.herokuapp.com/vendors/${id}/items/`)
  .then(response => {
    if(!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`)
    }
    return response.json()
  })
}

export function getOneVendor(vendorID: number) {
  return fetch(
    `https://quiet-depths-54407-77a00505f51e.herokuapp.com/vendors/${vendorID}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

export function getOneCustomer(customerID: number) {
  return fetch(
    `https://quiet-depths-54407-77a00505f51e.herokuapp.com/customers/${customerID}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}