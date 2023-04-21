import React from 'react'
import { useLocation } from 'react-router'

const Exchange = () => {
  const location = useLocation()

  console.log(location.state.ticket)

  return (
    <div>Exchange</div>
  )
}

export default Exchange