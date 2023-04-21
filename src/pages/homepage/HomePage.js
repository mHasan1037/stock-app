import React from 'react'
import './home.scss'
import heroImg from '../../images/hero-phone.png'


const HomePage = () => {
  return (
    <div className='homeContainer'>
        <section className='hero-section'>
            <aside>
                <h1><span className='stockWord'>Stock</span> Exchange</h1>
                <h3>Buy, sell, trade anytime</h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                <div className='heroSearch'>
                    <button>Search</button>
                    <input type='text' placeholder='Search Ticket...'/> 
                </div>
            </aside>
            <div className='heroImg'>
              <img src={heroImg} />
            </div>
        </section>
    </div>
  )
}

export default HomePage