import React from 'react'
import { Link } from 'react-router-dom'

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
      >
        <h1>Work in progress</h1>
        <Link to='/'>Go to home page!</Link>
    </div>
  )
}

export default ContactUs