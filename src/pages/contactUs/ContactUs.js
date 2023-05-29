import React from 'react'
import { Link } from 'react-router-dom'
import './contact.scss'

const ContactUs = () => {
  return (
    <div
        style={{
          height: '90vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '20px',
        }}
        className='contact-container'
      >
        <h1>Work in progress</h1>
        <Link to='/' className="link-styles">Go to home page!</Link>
    </div>
  )
}

export default ContactUs