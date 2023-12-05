function getAllVendors() {
  return fetch('https://6c085813-47a4-4651-aa7b-f46895da24ad.mock.pstmn.io/vendors')
  .then(response => {
    if(!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`)
    }
    return response.json()
  })
}

function getAllCustomers() {
  return fetch('https://6c085813-47a4-4651-aa7b-f46895da24ad.mock.pstmn.io/customers')
  .then(response => {
    if(!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`)
    }
    return response.json()
  })
}

function getAllItems() {
  return fetch('https://6c085813-47a4-4651-aa7b-f46895da24ad.mock.pstmn.io/items')
  .then(response => {
    if(!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`)
    }
    return response.json()
  })
}

function getAllPreOrders() {
  return fetch('https://6c085813-47a4-4651-aa7b-f46895da24ad.mock.pstmn.io/preorders')
  .then(response => {
    if(!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`)
    }
    return response.json()
  })
}

export { getAllVendors, getAllCustomers, getAllItems, getAllPreOrders }