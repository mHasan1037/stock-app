import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx'
import Logo from '../images/logo.png'
import useMobileBreakPoint from '../hooks/useMobileBreakPoint'

const menuItems = [
    {text: 'Home', link: '/'},
    {text: 'Exchange', link: '/exchange'},
    {text: 'About Us', link: '/aboutUs'},
    {text: 'Contact Us', link: '/contactUs'},
    {text: 'Login', link: '/loginPage'},
    {text: 'Sign Up', link: '/signUp'}
]

const Navbar = () => {
  const isMobile = useMobileBreakPoint(768);
  const [showNav, setShowNav] = useState(false)

  const handleBurgerClick = () =>{
     setShowNav(!showNav)
  }

  const handleMenuClose = () =>{
    setShowNav(false)
  }


  useEffect(()=>{
    isMobile ? setShowNav(false) : setShowNav(null)
  }, [isMobile])


  return (
    <div className='navBar'>
        <nav className={showNav ? 'showNav' : ''}>
            <Link to="/" onClick={()=> showNav ? setShowNav(false) : setShowNav(null)} className='logo-box'><img className='nav-logo' src={Logo} />FinInfo</Link>
            <ul>
                {
                  menuItems.map((item =>(
                     <li key={item.link}>
                         <Link onClick={handleMenuClose} to={item.link}>
                             {item.text}
                         </Link>
                     </li>
                  )))  
                }
            </ul>
            {isMobile && (
            <>
                <div className='menu-box'>
                    <Link to="/loginPage">Login</Link>
                </div>
                {showNav ? 
                    <RxCross2 onClick={handleBurgerClick} className='burger-menu'/>  :
                    <RxHamburgerMenu onClick={handleBurgerClick} className='burger-menu'/> 
                }
            </>
            )}
        </nav>
    </div>
  )
}

export default Navbar