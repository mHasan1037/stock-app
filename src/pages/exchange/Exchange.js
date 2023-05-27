import React, { useEffect, useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { StockContext } from '../../hooks/StockContext'
import './exchange.scss'
import {AiOutlineSearch, AiOutlineStock} from 'react-icons/ai'
import {RiStockFill} from 'react-icons/ri'
import {SiShutterstock} from 'react-icons/si'
import {CgShutterstock} from 'react-icons/cg'
import ExchangeChart from './ExchangeChart'

const Exchange = () => {
  const location = useLocation()
  const [ticketData, setTicketData] = useState('')
  const navigate = useNavigate()
  const { passData } = useContext(StockContext)
  const [dataStore, setDataStore] = useState([])
  

  useEffect(()=>{
        const dataStock = Object.entries(passData).map(([key, value])=>{
        const names = value.meta.symbol
        const dates = value.values[0].datetime
        const high = parseInt(value.values[0].high)
        const low = parseInt(value.values[0].low)
        const open = parseInt(value.values[0].open)
        const close = parseInt(value.values[0].close)
        const allHigh = Object.entries(value.values)


        allHigh.map(([subkey, subValue], idx) =>{
           const {high, low, open, close, datetime} = subValue
           return [high, low, open, close, datetime]
        })

        return [names, dates, high, low, open, close, allHigh]
  })


    setDataStore(dataStock)
  }, [])





  
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

        {
          /*
           top stock information starts from here
          */
        }

        {
          dataStore.map((data, id) => {
            const [names, dates, high, low, open, close, allHigh] = data
           
            return <section className='exchange-main' key={id}>
            <div className='exchange-stock-container'>   
                <div className='exchange-stock-box'>
                    <div className='exchange-heading'>
                      <h1>{names}</h1>
                      <p>Updated till:- &nbsp; {dates}</p>
                    </div>
                    <div className='exchange-stock-info'>
                        <div className='exchange-left'>
                          <div className='exchange-left-info'>
                              <div className='exchange-left-box'>      
                                 <AiOutlineStock className='exchange-graph' />
                                 <h1>{high}</h1>
                                 <p>High</p>
                              </div>
                              <div className='exchange-left-box'>
                                 <RiStockFill className='exchange-graph' />
                                 <h1>{low}</h1>
                                 <p>Low</p>
                              </div>
                              <div className='exchange-left-box'> 
                                 <SiShutterstock className='exchange-graph'/>
                                 <h1>{open}</h1>
                                 <p>Open</p>
                              </div>
                              <div className='exchange-left-box'>
                                 <CgShutterstock className='exchange-graph' /> 
                                 <h1>{close}</h1>
                                 <p>Close</p>
                              </div>
                          </div>
                        </div>
                        <div className='exchange-right'>
                              <ExchangeChart className="chart-box" candleStick={allHigh} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
          })
        }

        
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