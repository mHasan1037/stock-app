import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

const Exchange = () => {
  const location = useLocation()
  const [ticketData, setTicketData] = useState('')

  
  useEffect(()=>{
    setTicketData(location.state.ticket)
  }, [])

  return (
    <div>{ticketData}</div>
  )
}

export default Exchange