import React, { useEffect, useRef, useState } from 'react'
import './home.scss'
import heroImg from '../../images/hero-phone.png'
import images from './importLogos'
import SearchBar from '../../components/SearchBar'
import {FiArrowUpRight, FiArrowDownRight} from 'react-icons/fi'
import { useNavigate } from 'react-router'
import Intel from '../../images/intel.png'
import Tesla from '../../images/Tesla.png'
import Meta from '../../images/meta.png'
import Microsoft from '../../images/microsoft.png'
import Apple from '../../images/apple.png'


const HomePage = () => {
   const [companyTicket, setCompanyTicket] = useState({})
   const [isTimelineActive, setIsTimelineActive] = useState(false)

   const timelineRef = useRef(null)
   const navigate = useNavigate()

   useEffect(()=>{
       const timelineObserver = new IntersectionObserver(entries =>{
         entries.forEach(entry =>{
            if(entry.isIntersecting){
               setIsTimelineActive(true)
            }else{
               setIsTimelineActive(false)
            }
         })
       }, {rootMargin: '-70px 0px'})

       timelineObserver.observe(timelineRef.current)
       return () => timelineObserver.disconnect()
   }, [])

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

   const handleDetails = (ticket) =>{
      console.log(ticket)
      navigate('/exchange', {state: {ticket}})
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
            <td style={{
               color: parseFloat((open - close).toFixed(2)) < 0 ? 'red' : 'green',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               gap: '3px'
               }}>
               {parseFloat((open - close).toFixed(2))}
               {parseFloat((open - close).toFixed(2)) < 0 ? <FiArrowDownRight /> : <FiArrowUpRight />}
            </td>
            <td><button className='stock-details-btn' onClick={()=> handleDetails(stock.key)}>Details</button></td>
         </tr>
      )})

  return (
    <div className='homeContainer'>
       {
        // hero section starts from here......
       }
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
         {
          // logo slider section starts from here...
         }
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
         {
           // stock table section starts from here...
         }
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
         {
            // timeline section starts from here...
         }
        <section className='home-time-line'>
           <p>ROADMAP</p>
           <h1>How it's started</h1>

           <div className={`timeline-container ${isTimelineActive ? 'timeline-anim' : ''}`} ref={timelineRef}>
               <div className='timeline-holder left-box'>
                  <div className='timeline-img-box odd'>
                     <img src={Intel} />
                  </div>
                  <div className='timeline-box'>
                     <h3>What is Lorem Ipsum?</h3>
                     <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                  </div>
               </div>
               <div className='timeline-holder right-box'>
                  <div className='timeline-img-box'>
                     <img src={Meta} />
                  </div>
                  <div className='timeline-box'>
                     <h3>Why do we use it?</h3>
                     <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                  </div>
               </div>
               <div className='timeline-holder left-box'>
                  <div className='timeline-img-box odd'>
                     <img src={Microsoft} />
                  </div>
                  <div className='timeline-box'>
                     <h3>Where does it come from?</h3>
                     <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                  </div>
               </div>
               <div className='timeline-holder right-box'>
                  <div className='timeline-img-box'>
                     <img src={Tesla} />
                  </div>
                  <div className='timeline-box'>
                     <h3>Where can I get some?</h3>
                     <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                  </div>
               </div>
               <div className='timeline-holder left-box'>
                  <div className='timeline-img-box odd'>
                     <img src={Microsoft} />
                  </div>
                  <div className='timeline-box'>
                     <h3>Where does it come from?</h3>
                     <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                  </div>
               </div>
               <div className='timeline-holder right-box'>
                  <div className='timeline-img-box'>
                     <img src={Apple} />
                  </div>
                  <div className='timeline-box'>
                     <h3>Why do we use it?</h3>
                     <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                  </div>
               </div>
           </div>
        </section>

    </div>
  )
}

export default HomePage