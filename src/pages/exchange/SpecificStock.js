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

  // return (
  //   // <div
  //   //       style={{
  //   //         height: '90vh',
  //   //         display: 'flex',
  //   //         justifyContent: 'center',
  //   //         alignItems: 'center',
  //   //         flexDirection: 'column',
  //   //         gap: '20px',
  //   //       }}
  //   //     >
  //   //       <h3>Work in progress</h3>
  //   //       <h2>You will see all the data of <span style={{color: 'green', fontSize: '2.5rem'}}>{`{ ${ticketData} }`}</span> on this page very soon</h2>
  //   //       <a href='#' onClick={()=> navigate('/')}>Go to home page</a>
  //   //   </div>
    

  // )

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
       we got it 
    </div>
    )
  }

}

export default SpecificStock