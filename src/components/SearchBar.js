import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import useSearch from '../hooks/useSearch'

const SearchBar = ({marginTop, fontSize}) => {
    const [ticket, setTicket] = useState('')
    const [changeUrl, setChangeUrl] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const { searchStock } = useSearch(changeUrl)
    const navigate = useNavigate()
    const ulRef = useRef(null)


    useEffect(()=>{
      if(ticket.length > 0){
        setChangeUrl(`https://api.twelvedata.com/symbol_search?symbol=${ticket.toUpperCase()}`)
      }else{
        setChangeUrl('')
      }
    }, [ticket])

    useEffect(()=>{
      setSearchResult(searchStock)
    }, [searchStock])



   // click on the <li> will take the stock sambol to exchange page
   const handleSearchOptions = (symbol) =>{
      const ticket = symbol
      navigate('/exchange', {state: {ticket}})
   }


   //click on the search button will take the stock sambol to another page
   const handleSubmit = (e) =>{
        e.preventDefault();
        navigate('/exchange', {state: {ticket}})
        setTicket('')
    }


   // if you click outside of the searchbar the searchbar will disapear
   const clickOutsideUl = (e) =>{
      if(ulRef.current && !ulRef.current.contains(e.target)){
        setSearchResult([])
      }
   }

   useEffect(()=>{
      document.addEventListener('click', clickOutsideUl)

      return () => {
        document.removeEventListener('click', clickOutsideUl)
      }
   }, [])


  return (
    <div className='heroSearchSec'>
        <form className='heroSearch' onSubmit={handleSubmit} style={{marginTop: marginTop}}>
            <button type='submit' style={{fontSize: fontSize}}>Search</button>
            <input type='text' style={{fontSize: fontSize}} value={ticket} placeholder='Search Ticket...' onChange={(e)=> setTicket(e.target.value)} required/> 
        </form>
        <ul className='searchOptions' ref={ulRef} style={searchResult.length !== 0 ? {display: 'block'} : {display: 'none'}}>
          {          
            
          searchResult.length !== 0 && searchResult.map((stock, idx) =>{
                          const {symbol, instrument_name} = stock
            
                          if(stock){
                            return(
                              <li key={idx} onClick={()=> handleSearchOptions(symbol)}>{instrument_name}</li>
                            )
                          }else{
                            return (
                              <li>No company found!</li>
                            )
                          }

                        }) 
          } 
        </ul>
    </div>
  )
}

export default SearchBar