export function getAllVendors() {
  return fetch('https://6c085813-47a4-4651-aa7b-f46895da24ad.mock.pstmn.io/vendors')
  .then(response => {
    if(!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`)
    }
    return response.json()
  })
}

export function getAllCustomers() {
  return fetch('https://6c085813-47a4-4651-aa7b-f46895da24ad.mock.pstmn.io/customers')
  .then(response => {
    if(!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`)
    }
    return response.json()
  })
}

export function getAllItems() {
  return fetch('https://6c085813-47a4-4651-aa7b-f46895da24ad.mock.pstmn.io/items')
  .then(response => {
    if(!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`)
    }
    return response.json()
  })
}

export function getAllPreOrders() {
  return fetch('https://6c085813-47a4-4651-aa7b-f46895da24ad.mock.pstmn.io/preorders')
  .then(response => {
    if(!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`)
    }
    return response.json()
  })
}

export function getSelectedVendorsItems(id: number) {
  return fetch(`https://6c085813-47a4-4651-aa7b-f46895da24ad.mock.pstmn.io/vendors/${id}/items/`)
  .then(response => {
    if(!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`)
    }
    return response.json()
  })
}

export function getOneVendor(vendorID: number) {
  return fetch(
    `https://6c085813-47a4-4651-aa7b-f46895da24ad.mock.pstmn.io/vendors/${vendorID}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

export function getOneCustomer(customerID: number) {
  return fetch(
    `https://6c085813-47a4-4651-aa7b-f46895da24ad.mock.pstmn.io/customers/${customerID}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}