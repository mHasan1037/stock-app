import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router'
import './specificStock.scss'
import BigSearchBar from '../../components/BigSearchBar'

const SpecificStock = ({ticketData}) => {
  const navigate = useNavigate()
  const [currentInfo, setCurrentInfo] = useState('')
  const [thirtyDayInfo, setThirtyDayInfo] = useState('')
  const [getTicket, setGetTicket] = useState(ticketData)
 
  //https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=META&apikey=UNZLJ95Q4M3DQSMU
  //https://api.twelvedata.com/time_series?symbol=AAPL&interval=1min&apikey=fc8e2d7c7326415a8e316a8d6a6e853d
  //https://api.twelvedata.com/quote?symbol=${ticketData.toUpperCase()}&apikey=fc8e2d7c7326415a8e316a8d6a6e853d
  //https://api.twelvedata.com/time_series?symbol=${ticketData.toUpperCase()}&interval=1day&apikey=fc8e2d7c7326415a8e316a8d6a6e853d

  useEffect(()=>{
    const getStock = async() =>{
       const res = await fetch(`https://api.twelvedata.com/quote?symbol=${getTicket.toUpperCase()}&apikey=fc8e2d7c7326415a8e316a8d6a6e853d`)
       const data = await res.json()
       setCurrentInfo(data)
    }

    const getStockTwo = async() =>{
      const res = await fetch(`https://api.twelvedata.com/time_series?symbol=${getTicket.toUpperCase()}&interval=1day&apikey=fc8e2d7c7326415a8e316a8d6a6e853d`)
      const data = await res.json()
      setThirtyDayInfo(data)
   }

   getStockTwo()

    getStock()
  }, [getTicket])


  //getting ticket data from form
  const getTicketData = (ticket) =>{
    setGetTicket(ticket)
  }

  console.log({'first': currentInfo, 'secont': thirtyDayInfo})

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  if(currentInfo.status === 'error' || thirtyDayInfo.status === 'error'){
    return (
   <div className='lost_container'>
        <h1>No data found</h1>
        <br></br>
        <p>Please write the correct symbol to find data</p>
        <h3>OR</h3>
        <p>Maybe you have reached the api call limit 	&#128556;</p>

        <BigSearchBar getTicketData={getTicketData} />
    </div>
    )
  }else{
    return (
    <div className='specific_container'>
        <div className='specific_main'>
            <div className='specific_left'>
                <div className='spec_left_top'>
                    <div className='company_name'>
                       <h2>{currentInfo.name}</h2>
                       <p>{thirtyDayInfo && thirtyDayInfo.meta.exchange_timezone} ({currentInfo.is_market_open ? 'Open' : 'Close'})</p>
                    </div>
                    <div className='stock_type'>
                       <h3>{thirtyDayInfo && thirtyDayInfo.meta.type}</h3>
                       <p>{new Date(currentInfo.timestamp * 1000).toLocaleString()}</p>
                    </div>
                </div>
                <div className='stock_current_info'>
                    <div className='stock_daily_info'>
                        <div className='stock_info_box'>
                            <p>Open</p>
                            <h3>{currentInfo.open}</h3>
                        </div>
                        <div className='stock_info_box'>
                            <p>High</p>
                            <h3>{currentInfo.high}</h3>
                        </div>
                        <div className='stock_info_box'>
                            <p>Volume</p>
                            <h3>{currentInfo.volume}</h3>
                        </div>
                        <div className='stock_info_box'>
                            <p>Close</p>
                            <h3>{currentInfo.close}</h3>
                        </div>
                        <div className='stock_info_box'>
                            <p>Low</p>
                            <h3>{currentInfo.low}</h3>
                        </div>
                        <div className='stock_info_box'>
                            <p>Avg_volume</p>
                            <h3>{currentInfo.average_volume}</h3>
                        </div>
                        <div className='stock_info_box'>
                            <p>Prev Close</p>
                            <h3>{currentInfo.previous_close}</h3>
                        </div>
                        <div className='stock_info_box'>
                            <p>Change</p>
                            <h3>{currentInfo.change}</h3>
                        </div>
                        <div className='stock_info_box'>
                            <p>Per_change</p>
                            <h3>{currentInfo.percent_change}</h3>
                        </div>
                    </div>
                    <div className='last_year_info'>
                        <p>Last one year data:-</p>

                        <div className='last_year_div'>
                            <div><p>High</p><h3>{currentInfo && currentInfo.fifty_two_week.high}</h3></div>
                            <div><p>Change</p><h3>{currentInfo && currentInfo.fifty_two_week.high_change}</h3></div>
                            <div><p>Percentage</p><h3>{currentInfo && currentInfo.fifty_two_week.high_change_percent}</h3></div>
                        </div>
                        <div className='last_year_div'>
                            <div><p>Low</p><h3>{currentInfo && currentInfo.fifty_two_week.low}</h3></div>
                            <div><p>Change</p><h3>{currentInfo && currentInfo.fifty_two_week.low_change}</h3></div>
                            <div><p>Percentage</p><h3>{currentInfo && currentInfo.fifty_two_week.low_change_percent}</h3></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='specific_right'>
                <p>Last one year data:-</p>

                <div>
                    <div><p>High</p><h3>{currentInfo && currentInfo.fifty_two_week.high}</h3></div>
                    <div><p>Change</p><h3>{currentInfo && currentInfo.fifty_two_week.high_change}</h3></div>
                    <div><p>Percentage</p><h3>{currentInfo && currentInfo.fifty_two_week.high_change_percent}</h3></div>
                </div>
                <div>
                    <div><p>Low</p><h3>{currentInfo && currentInfo.fifty_two_week.low}</h3></div>
                    <div><p>Change</p><h3>{currentInfo && currentInfo.fifty_two_week.low_change}</h3></div>
                    <div><p>Percentage</p><h3>{currentInfo && currentInfo.fifty_two_week.low_change_percent}</h3></div>
                </div>
            </div>
        </div>
    </div>
    )
  }

}

export default SpecificStock