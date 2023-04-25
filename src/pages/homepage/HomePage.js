import React, { useState } from 'react'
import './home.scss'
import heroImg from '../../images/hero-phone.png'
import images from './importLogos'
import SearchBar from '../../components/SearchBar'


const HomePage = () => {
   const [companyTicket, setCompanyTicket] = useState({})

   const handleData = async() =>{
      const response = await fetch(`https://api.twelvedata.com/time_series?symbol=AAPL,MSFT,TSLA,META,AMZN&interval=1day&apikey=fc8e2d7c7326415a8e316a8d6a6e853d`)
      const jsonData = await response.json()
  
      setCompanyTicket(jsonData)
   }

   const stocksData = Object.entries(companyTicket).map(([key, value])=>{
      const {open, close, datetime, high, low, volume} = value.values[0];

      return{
         key,
         data: {
            open,
            close,
            high,
            low,
            datetime,
            volume 
         }
      }
   })

   const handleDetails = (key) =>{
      console.log(key)
   }

   const tableRows = stocksData.map((stock, index) =>{
      const {open, close, high, low, datetime, volume} = stock.data

      return(
         <tr key={index}>
            <td>{index + 1}</td>
            <td>{datetime}</td>
            <td>{stock.key}</td>
            <td>{open}</td>
            <td>{close}</td>
            <td>{high}</td>
            <td>{low}</td>
            <td>{volume}</td>
            <td>{
               parseFloat((open - close).toFixed(2))
               }</td>
            <td><button onClick={()=> handleDetails(stock.key)}>Details</button></td>
         </tr>
      )})

  return (
    <div className='homeContainer'>
        <section className='hero-section'>
            <aside>
                <h1><span className='stockWord'>Stock</span> Exchange</h1>
                <h3>Buy, sell, trade anytime</h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                <SearchBar marginTop="40px" fontSize="18px" />
            </aside>
            <div className='heroImg'>
              <img src={heroImg} />
            </div>
        </section>
        <section className='logoSlide-section'>
           <div className='logoSlider-container'>
              {
                images.map((i, idx)=>(
                   <div className='logoSlide' key={idx}>
                      <img src={i.path} alt={i.name} />
                   </div>
                ))
              }
              {
                images.map((i, idx)=>(
                   <div className='logoSlide' key={idx}>
                      <img src={i.path} alt={i.name} />
                   </div>
                ))
              }
           </div>
        </section>
        <section className='top-stock-Container'>
           <div className='top-stock-header'>
              <h2 onClick={handleData}>Current Market</h2>
              <SearchBar />
           </div>
           <div className='top-stock-table'>
              <table>
                 <thead>
                     <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Stock</th>
                        <th>Open</th>
                        <th>Close</th>
                        <th>High</th>
                        <th>Low</th>
                        <th>Volume</th>
                        <th>Change</th>
                        <th>#</th>
                     </tr>
                 </thead>
                 <tbody>
                        {tableRows}
                 </tbody>
              </table>
           </div>
        </section>
    </div>
  )
}

export default HomePage