import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router'
import './specificStock.scss'
import BigSearchBar from '../../components/BigSearchBar'
import {HiLockOpen, HiLockClosed} from 'react-icons/hi'
import SpecificChart from './SpecificChart'
import SearchBar from '../../components/SearchBar'

const SpecificStock = ({ticketData}) => {
  const navigate = useNavigate()
  const [currentInfo, setCurrentInfo] = useState('')
  const [thirtyDayInfo, setThirtyDayInfo] = useState('')
  const [getTicket, setGetTicket] = useState(ticketData)

  const [stockNews, setStockNews] = useState([])
  const [newsPerPage, setNewsPerPage] = useState(10)
  const [pageNo, setPageNo] = useState(1)
 
  
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

   const getStockNews = async() =>{
      const res = await fetch(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${getTicket.toUpperCase()}&apikey=UNZLJ95Q4M3DQSMU`);
      const data = await res.json()
      setStockNews(data.feed)
   }

    getStockTwo()
    getStock()
    getStockNews()
  }, [getTicket])


  console.log(stockNews)

  //getting ticket data from form
  const getTicketData = (ticket) =>{
    setGetTicket(ticket)
  }

  //chart data passed to chart component
  let stockThirtyValues = thirtyDayInfo && thirtyDayInfo.values


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
                       <p style={{marginTop: '7px', display: 'flex', gap: '8px'}}>
                        {thirtyDayInfo && thirtyDayInfo.meta.exchange_timezone} 
                          <span style={currentInfo.is_market_open ? {color: 'green'} : {color: 'red'}}>
                            {currentInfo.is_market_open ? <HiLockOpen /> : <HiLockClosed />}
                            {currentInfo.is_market_open ? 'Open': `Close`}
                          </span>
                       </p>
                    </div>
                    <div className='stock_type'>
                       <h3>{thirtyDayInfo && thirtyDayInfo.meta.type}</h3>
                       <p>{new Date(currentInfo.timestamp * 1000).toLocaleString()}</p>
                    </div>
                </div>

                {
                    //all info of current market is here
                }
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
                            <h3 style={currentInfo.change > 0 ? {color: 'green'} : {color: 'red'}}>{currentInfo.change}</h3>
                        </div>
                        <div className='stock_info_box'>
                            <p>Per_change</p>
                            <h3 style={currentInfo.percent_change > 0 ? {color: 'green'} : {color: 'red'}}>
                                {parseFloat(currentInfo.percent_change).toFixed(2)}%
                            </h3>
                        </div>
                    </div>
                    <div className='last_year_info'>
                        <p>Last one year data:-</p>

                        <div className='last_year_div'>
                            <div><p>High</p><h3>{currentInfo && parseFloat(currentInfo.fifty_two_week.high).toFixed(2)}</h3></div>
                            <div><p>Change</p><h3 style={currentInfo && currentInfo.fifty_two_week.high_change > 0 ? {color: 'green'} : {color: 'red'}}>{currentInfo && parseFloat(currentInfo.fifty_two_week.high_change).toFixed(2)}</h3></div>
                            <div><p>Percentage</p><h3 style={currentInfo && currentInfo.fifty_two_week.high_change_percent > 0 ? {color: 'green'} : {color: 'red'}}>{currentInfo && parseFloat(currentInfo.fifty_two_week.high_change_percent).toFixed(2)}%</h3></div>
                        </div>
                        <div className='last_year_div'>
                            <div><p>Low</p><h3>{currentInfo && parseFloat(currentInfo.fifty_two_week.low).toFixed(2)}</h3></div>
                            <div><p>Change</p><h3 style={currentInfo && currentInfo.fifty_two_week.low_change > 0 ? {color: 'green'} : {color: 'red'}}>{currentInfo && parseFloat(currentInfo.fifty_two_week.low_change).toFixed(2)}</h3></div>
                            <div><p>Percentage</p><h3 style={currentInfo && currentInfo.fifty_two_week.low_change_percent > 0 ? {color: 'green'} : {color: 'red'}}>{currentInfo && parseFloat(currentInfo.fifty_two_week.low_change_percent).toFixed(2)}%</h3></div>
                        </div>
                    </div>
                </div>

                {
                    //Chart is here
                }

                <div className='stock_chart'>
                    <SpecificChart stockThirtyValues={stockThirtyValues} name={currentInfo.name} />
                </div>
            </div>
            <div className='specific_right'>
                <SearchBar />
                
                <div className='stock_news_sec'>
                    <h2 style={{textDecoration: 'underline'}}>Market news</h2>

                   <div className='news_container'>
                   {
                        stockNews && stockNews.length > 0 ? stockNews.slice(pageNo, newsPerPage).map((news, idx)=>{
                            const {banner_image, url, title} = news
                           return (
                            <div className='news_box'>
                                <a className="img_link" href={url} target='_blank'><img src={banner_image} /></a>
                                <a href={url} className='news_title' target='_blank'>{title.length > 35 ? `${title.slice(0, 35)}...` : title}
                                  <p>{title}</p>
                                </a>
                            </div>
                           )
                        }) :
                        <h3>No news found</h3>
                    }
                   </div>
                   <div className='news_pagination'>
                      
                   </div>
                </div>
            </div>
        </div>
    </div>
    )
  }

}

export default SpecificStock