import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

const Exchange = () => {
  const location = useLocation()
  const [ticketData, setTicketData] = useState('')
  const navigate = useNavigate()

  
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
          <h3>Work in process</h3>
          <h2>You will see all the data of <span style={{color: 'green', fontSize: '2.5rem'}}>{`{ ${ticketData} }`}</span> on this page very soon</h2>
          <a href='#' onClick={()=> navigate('/')}>Go to home page</a>
      </div>
    )
  }

  const working = () =>{
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
         <h1>Work in process</h1>
         <Link to='/'>Go to home page!</Link>
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