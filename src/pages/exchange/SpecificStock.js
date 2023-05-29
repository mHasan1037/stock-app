import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router'

const SpecificStock = ({ticketData}) => {
  const navigate = useNavigate()
  const [getStockInfo, setGetStockInfo] = useState('')
  const [getStockInfoTwo, setGetStockInfoTwo] = useState('')
 
  //https://api.twelvedata.com/quote?symbol=${ticketData.toUpperCase()}&apikey=fc8e2d7c7326415a8e316a8d6a6e853d
  //https://api.twelvedata.com/time_series?symbol=${ticketData.toUpperCase()}&interval=1day&apikey=fc8e2d7c7326415a8e316a8d6a6e853d

  useEffect(()=>{
    const getStock = async() =>{
       const res = await fetch(`https://api.twelvedata.com/quote?symbol=${ticketData.toUpperCase()}&apikey=fc8e2d7c7326415a8e316a8d6a6e853d`)
       const data = await res.json()
       setGetStockInfo(data)
    }

    const getStockTwo = async() =>{
      const res = await fetch(`https://api.twelvedata.com/time_series?symbol=${ticketData.toUpperCase()}&interval=1day&apikey=fc8e2d7c7326415a8e316a8d6a6e853d`)
      const data = await res.json()
      setGetStockInfoTwo(data)
   }

   getStockTwo()

    getStock()
  }, [ticketData])

  console.log({'first': getStockInfo, 'secont': getStockInfoTwo})

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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

export default SpecificStock