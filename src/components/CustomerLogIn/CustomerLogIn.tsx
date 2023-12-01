import React, { useState } from 'react'
import './CustomerLogIn.css'

const CustomerLogIn = () => {

  const [customerLoginEmail, setCustomerLoginEmail] = useState('')
  const [customerLoginPassword, setCustomerLoginPassword] = useState('')
  return (
    <form className='customer-login-container'>
      <h2 className='customer-login-header'>MARKET NEXT DOOR</h2>
      <input className='customer-login-input'
        type='text'
        name='customerEmail'
        placeholder='Enter email...'
        value={customerLoginEmail}
        onChange={e => setCustomerLoginEmail(e.target.value)}
      />
      <input className='customer-login-input'
        type='text'
        name='customerPassword'
        placeholder='Enter password...'
        value={customerLoginPassword}
        onChange={e => setCustomerLoginPassword(e.target.value)}
      />
      <button className='customer-login-submit-btn'>SIGN IN</button>
      <p className='customer-login-text'>OR</p>
      <button className='customer-login-submit-btn'>SIGN UP</button>
      <button className='customer-login-go-back-btn'>Go Back</button>
    </form>
  )
}

export default CustomerLogIn