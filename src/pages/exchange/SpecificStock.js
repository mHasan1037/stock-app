import React, {useEffect} from 'react'
import { useNavigate } from 'react-router'

const SpecificStock = ({ticketData}) => {
  const navigate = useNavigate()

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