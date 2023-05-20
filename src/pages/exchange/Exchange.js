import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import './exchange.scss'
import {AiOutlineSearch} from 'react-icons/ai'

const Exchange = ({onPassData}) => {
  const location = useLocation()
  const [ticketData, setTicketData] = useState('')
  const navigate = useNavigate()

  console.log(onPassData)

  
  useEffect(()=>{
     if(location.state && location.state.ticket) {
      setTicketData(location.state.ticket)
     }
  }, [])



  const data = () =>{
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
          <h3>Work in progress</h3>
          <h2>You will see all the data of <span style={{color: 'green', fontSize: '2.5rem'}}>{`{ ${ticketData} }`}</span> on this page very soon</h2>
          <a href='#' onClick={()=> navigate('/')}>Go to home page</a>
      </div>
    )
  }

  const working = () =>{
    return (
      <div className='exchange-container'>
        <section className='exchange-hero-sec'>
            <h1>Secure Investing for <span>Everyday Traders</span>.</h1>
            <form className='search-bar'>
               <input type='text' placeholder='Search your stock...' />
               <AiOutlineSearch className='search-icon'/>
            </form>    
        </section>
        <div className='exchange-main'>
            <div className='exchange-stock-container'>
                <div className='exchange-stock-box'>
                    <h1>MISF</h1>
                    <div className='exchange-stock-info'>
                        <div className='exchange-left'>
                          <div className='exchange-left-info'>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                          </div>
                        </div>
                        <div className='exchange-right'>
                          <div>
                              <div></div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }

  return(
    <>
      {ticketData ? data() : working() }
    </>
  )
}

export default Exchange