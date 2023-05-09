import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../images/logo.png'
import {FaFacebookF} from 'react-icons/fa'
import {AiOutlineTwitter, AiOutlineInstagram, AiFillYoutube, AiOutlineMail} from 'react-icons/ai'
import {BsArrowRightCircle} from 'react-icons/bs'
import {FaCcVisa, FaCcMastercard, FaCcPaypal} from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='footer-container'>
        <div className='footer-main'>
            <section className='footer-body'>
                <div className='footer-logos-sec'>
                    <Link to="/" className='logo-box' onClick={()=> window.scrollTo({top: 0, behavior: 'smooth'})}><img src={logo} />FinInfo</Link>
                    <i>Address, 12 east 50th street, 4th <br /> City name, DK 20145</i>
                    <div className='footer-social'>
                        <FaFacebookF />
                        <AiOutlineTwitter />
                        <AiOutlineInstagram />
                        <AiFillYoutube />
                    </div>
                </div>
                <div className='footer-options'>
                    <h3>Categories</h3>
                    <ul>
                        <li>History</li>
                        <li>Events Partners</li>
                        <li>Career</li>
                        <li>Payments</li>
                        <li>Management</li>
                    </ul>
                </div>
                <div className='footer-options'>
                    <h3>Userful Links</h3>
                    <ul>
                        <li>Payment & Tax</li>
                        <li>Terms of Service</li>
                        <li>My Account</li>
                        <li>Return Policy</li>
                        <li>Discount</li>
                    </ul>
                </div>
                <div className='footer-newsletter'>
                    <h3>Newsletter</h3>
                    <p>Get now free 20% discount for all products on your first order</p>
                    <div className='newsletter-box'>
                         <AiOutlineMail className='newsletter-icon' />
                         <input type='email' placeholder='Your Email Address' />
                         <BsArrowRightCircle className='newsletter-icon' />
                    </div>
                    <p>T: +1-202-555-0184</p>
                    <p>E: hello@fininfo</p>
                </div>
            </section>

            {
                // streight line after the footer section...
            }
            <div style={{
                width: '100%',
                height: '0.5px',
                background: '#5D5D5D',
                marginTop: '70px'
            }}>
            </div>

            <div className='copy-section'>
                <p>© {new Date().getFullYear()} fininfo.com</p>
                <div className='copy-policy'>
                    <p>Privacy Policy</p>
                    <p>Terms & Conditions</p>
                    <p>Cookies/Ad Choices</p>
                </div>
                <div className="copy-payment">
                    <FaCcVisa />
                    <FaCcMastercard />
                    <FaCcPaypal />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer