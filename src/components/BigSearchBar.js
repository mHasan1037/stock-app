import React, {useRef, useState, useEffect} from 'react'
import './bigSearchBar.scss'
import {AiOutlineSearch, AiOutlineStock} from 'react-icons/ai'
import useSearch from '../hooks/useSearch'

const BigSearchBar = ({getTicketData}) => {
    const ulRef = useRef(null)
    const [displayOptions, setDisplayOptions] = useState(false)
    const [searchResult, setSearchResult] = useState([])
    const [stockName, setStockName] = useState('')
    const [changeUrl, setChangeUrl] = useState('')
    const { searchStock } = useSearch(changeUrl)
    const [ticketData, setTicketData] = useState('')


    getTicketData(ticketData)


      // get search data from the useSearch custom hook
        useEffect(()=>{
            if(stockName.length > 0){
            setChangeUrl(`https://api.twelvedata.com/symbol_search?symbol=${stockName.toUpperCase()}`)
            }else{
            setChangeUrl('')
            } 
        }, [stockName])

        useEffect(()=>{
            setSearchResult(searchStock)
        }, [searchStock])

      //passing the stock name to stock by search section
        const handleStock = (e) =>{
            e.preventDefault()
            setTicketData(stockName)
            setStockName('')
        }

       // onclick on the input of search stock
        const handleStockInput = (e) =>{
            setStockName(e.target.value)
            setDisplayOptions(true)
            }

      // if you click outside of the searchbar the searchbar will disapear
        const clickOutsideUl = (e) =>{
            if(ulRef.current && !ulRef.current.contains(e.target)){
            setSearchResult([])
            setDisplayOptions(false)
            }
        }

        useEffect(()=>{
            document.addEventListener('click', clickOutsideUl)

            return () => {
            document.removeEventListener('click', clickOutsideUl)
            }
        }, [])

      // click on the <li> will take the stock sambol to exchange page
      const handleSearchOptions = (symbol) =>{
        setTicketData(symbol)
     }


  return (
    <form className='search-bar' style={{marginTop: '20px'}} onSubmit={handleStock}>
    <input type='text' placeholder='Search your stock...' value={stockName} onChange={handleStockInput}/>
    <AiOutlineSearch className='search-icon'/>

    <ul className='searchOptions' ref={ulRef} style={displayOptions ? {display: 'block'} : {display: 'none'}}>
            {          
        
            searchResult.length !== 0 ? (searchResult.map((stock, idx) =>{
            const {symbol, instrument_name} = stock

            if(stock){
                return(
                <li key={idx} onClick={()=> handleSearchOptions(symbol)}>{instrument_name}</li>
                )
            }
            }) ) : (
            <li style={{minWidth: '200px'}}>No company found! <br></br> Search by stock symbol</li>
            ) 
        }
    </ul>
    </form> 
  )
}

export default BigSearchBar