import React, { useEffect, useState, useContext, useRef } from 'react'
import { useLocation } from 'react-router'
import { StockContext } from '../../hooks/StockContext'
import './exchange.scss'
import {AiOutlineSearch, AiOutlineStock} from 'react-icons/ai'
import {RiStockFill} from 'react-icons/ri'
import {SiShutterstock} from 'react-icons/si'
import {CgShutterstock} from 'react-icons/cg'
import ExchangeChart from './ExchangeChart'
import SpecificStock from './SpecificStock'
import useSearch from '../../hooks/useSearch'

const Exchange = () => {
  const location = useLocation()
  const [ticketData, setTicketData] = useState('')
  const { passData } = useContext(StockContext)
  const [dataStore, setDataStore] = useState([])
  const [stockName, setStockName] = useState('')

  const [changeUrl, setChangeUrl] = useState('')
  const { searchStock } = useSearch(changeUrl)
  const [searchResult, setSearchResult] = useState([])
  const ulRef = useRef(null)
  const [displayOptions, setDisplayOptions] = useState(false)

  


  // get search data from the useSearch custom hook
  useEffect(()=>{
    if(stockName.length > 0){
      setChangeUrl(`https://api.twelvedata.com/symbol_search?symbol=${stockName.toUpperCase()}`)
    }else{
      setChangeUrl('')
    } 
  }, [stockName])

  useEffect(()=>{
    setSearchResult(searchStock)
  }, [searchStock])



  // if you click outside of the searchbar the searchbar will disapear
  const clickOutsideUl = (e) =>{
      if(ulRef.current && !ulRef.current.contains(e.target)){
        setSearchResult([])
        setDisplayOptions(false)
      }
   }

   useEffect(()=>{
      document.addEventListener('click', clickOutsideUl)

      return () => {
        document.removeEventListener('click', clickOutsideUl)
      }
   }, [])



  // click on the <li> will take the stock sambol to exchange page
      const handleSearchOptions = (symbol) =>{
        setTicketData(symbol)
     }


  
 //stock information of top five company is extracted here...
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


  //passing the stock name to stock by search section
  const handleStock = (e) =>{
    e.preventDefault()
    setTicketData(stockName)
    setStockName('')
  }

   // onclick on the input of search stock
   const handleStockInput = (e) =>{
    setStockName(e.target.value)
    setDisplayOptions(true)
    }


  const data = () =>{
    return (
      <SpecificStock ticketData={ticketData} />
    )
  }

  const allStockInfo = () =>{
    return (
      <div className='exchange-container'>
        <section className='exchange-hero-sec'>
            <h1>Secure Investing for <span>Everyday Traders</span>.</h1>
            <form className='search-bar' onSubmit={handleStock}>
               <input type='text' placeholder='Search your stock...' value={stockName} onChange={handleStockInput}/>
               <AiOutlineSearch className='search-icon'/>

              <ul className='searchOptions' ref={ulRef} style={displayOptions ? {display: 'block'} : {display: 'none'}}>
                    {          
                  
                    searchResult.length !== 0 ? (searchResult.map((stock, idx) =>{
                      const {symbol, instrument_name} = stock
        
                      if(stock){
                        return(
                          <li key={idx} onClick={()=> handleSearchOptions(symbol)}>{instrument_name}</li>
                        )
                      }
                    }) ) : (
                      <li style={{minWidth: '200px'}}>No company found! <br></br> Search by stock symbol</li>
                    ) 
                  }
              </ul>
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
                              <ExchangeChart className="chart-box" candleStick={allHigh} name={names} />
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
      {ticketData ? data() : allStockInfo() }
    </>
  )
}

export default Exchange