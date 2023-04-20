import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { RxHamburgerMenu } from 'react-icons/rx'
import Logo from '../images/logo.png'

const Navbar = () => {
  const [mobile, setMobile] = useState(false)

  return (
    <div className='navBar'>
        <nav>
            <Link to="/" className='logo-box'><img className='nav-logo' src={Logo} />FinInfo</Link>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/exchange">Exchange</Link>
                </li>
                <li>
                    <Link to="/aboutUs">About Us</Link>
                </li>
                <li>
                    <Link to="/contactUs">Contact Us</Link>
                </li>
                {!mobile && 
                  <li>
                     <Link to="/loginPage">Login</Link>
                  </li>
                } 
                <li>
                     <Link to="/signUp">Sign up</Link>
                </li>    
            </ul>
            {mobile && <RxHamburgerMenu />}
        </nav>
    </div>
  )
}

export default Navbar