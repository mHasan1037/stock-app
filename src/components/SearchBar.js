import React, { useState } from 'react'
import { useNavigate } from 'react-router'

const SearchBar = ({marginTop, fontSize}) => {
    const [ticket, setTicket] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) =>{
        e.preventDefault();
        navigate('/exchange', {state: {ticket}})
        setTicket('')
    }
  return (
    <form className='heroSearch' onSubmit={handleSubmit} style={{marginTop: marginTop}}>
        <button type='submit' style={{fontSize: fontSize}}>Search</button>
        <input type='text' style={{fontSize: fontSize}} value={ticket} placeholder='Search Ticket...' onChange={(e)=> setTicket(e.target.value)} required/> 
    </form>
  )
}

export default SearchBar