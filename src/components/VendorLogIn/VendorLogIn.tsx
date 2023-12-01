import React, { useState } from 'react'
import './VendorLogIn.css'

const VendorLogIn = () => {

  const [vendorLoginEmail, setVendorLoginEmail] = useState('')
  const [vendorLoginPassword, setVendorLoginPassword] = useState('')
  return (
    <form className='vendor-login-container'>
      <h2 className='vendor-login-header'>MARKET NEXT DOOR</h2>
      <input className='vendor-login-input'
        type='text'
        name='vendorEmail'
        placeholder='Enter email...'
        value={vendorLoginEmail}
        onChange={e => setVendorLoginEmail(e.target.value)}
      />
      <input className='vendor-login-input'
        type='text'
        name='vendorPassword'
        placeholder='Enter password...'
        value={vendorLoginPassword}
        onChange={e => setVendorLoginPassword(e.target.value)}
      />
      <button className='vendor-login-submit-btn'>SIGN IN</button>
      <p className='vendor-login-text'>OR</p>
      <button className='vendor-login-submit-btn'>SIGN UP</button>
      <button className='vendor-login-go-back-btn'>Go Back</button>
    </form>
  )
}

export default VendorLogIn