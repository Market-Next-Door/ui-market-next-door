import React from 'react'
import './CustomerLogIn.css'

const CustomerLogIn = () => {

  return (
    <div className='login-container'>
      <h2 className='login-header'>MARKET NEXT DOOR</h2>
      <input className='login-input'
        type='text'
        placeholder='Enter email...'
        value='Customer Doe'
      />
      <input className='login-input'
        type='text'
        placeholder='Password...'
        value='123'
      />
      <button className='login-submit-btn'>SIGN IN</button>
      <p className='login-text'>OR</p>
      <button className='login-submit-btn'>SIGN UP</button>
      <button className='login-go-back-btn'>Go Back</button>
    </div>
  )
}

export default CustomerLogIn