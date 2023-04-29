import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import {FiArrowUpRight, FiArrowDownRight} from 'react-icons/fi'

import CountUp from 'react-countup'
import ScrollTrigger from 'react-scroll-trigger'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './home.scss'

import images from './importLogos'
import SearchBar from '../../components/SearchBar'
import {FaFacebookF} from 'react-icons/fa'
import {AiOutlineTwitter, AiOutlineInstagram, AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai'

import Intel from '../../images/intel.png'
import Tesla from '../../images/Tesla.png'
import Meta from '../../images/meta.png'
import Microsoft from '../../images/microsoft.png'
import Apple from '../../images/apple.png'
import heroImg from '../../images/hero-phone.png'
import manOne from '../../images/man-1.avif'
import manTwo from '../../images/man-2.avif'
import manThree from '../../images/man-3.avif'
import manFour from '../../images/man-4.avif'
import manFive from '../../images/man-5.avif'
import manSix from '../../images/man-6.avif'
import manSeven from '../../images/man-7.avif'
import manEight from '../../images/man-8.avif'
import phoneImg from '../../images/first-mob.webp'
import playStore from '../../images/google-play.png'
import appStore from '../../images/app-store.png'
import Footer from '../../components/Footer'

const team = [
   {
      name : 'William Noah',
      designation: 'Front end developer',
      pic: manOne
  },
  {
     name : 'Bob Marley',
     designation: 'Back end developer',
     pic: manTwo
  },
  {
      name : 'Nathan Todd',
      designation: 'Ui/Ux designer',
      pic: manThree
   },
   {
      name : 'Wilson Becker',
      designation: 'Graphics designer',
      pic: manFour
   },
   {
      name : 'Alfredo White',
      designation: 'Photographer',
      pic: manFive
   },
   {
      name : 'Dallas Barker',
      designation: 'Art Director',
      pic: manSix
   },
   {
      name : "Oakley O'Connell",
      designation: 'CTO',
      pic: manSeven
  },
  {
      name : 'Joe Copper',
      designation: 'CEO',
      pic: manEight
   }
]

const faqs = [
   {
      question: 'Have you bought stock before?',
      answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
   },
   {
      question: 'How do I buy stock?',
      answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
   },
   {
      question: 'Best way to find stock?',
      answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
   },
   {
      question: 'How to study current market?',
      answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
   },
   {
      question: 'How do I widthdrow money from market?',
      answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
   },
]




const HomePage = () => {
   const [companyTicket, setCompanyTicket] = useState({})
   const [counter, setCounter] = useState(false)
   const [faqVisible, setFaqVisible] = useState(null)
   const navigate = useNavigate()

   const toggleFAQ = (idx) =>{
      setFaqVisible(faqVisible === idx ? null : idx)
   }


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

      // code for multi-carousel...
      const responsive = {
         superLargeDesktop: {
           // the naming can be any, depends on you.
           breakpoint: { max: 4000, min: 3000 },
           items: 5
         },
         desktop: {
           breakpoint: { max: 3000, min: 1024 },
           items: 4
         },
         tablet: {
           breakpoint: { max: 1024, min: 464 },
           items: 2
         },
         mobile: {
           breakpoint: { max: 464, min: 0 },
           items: 1
         }
       };

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

           <div className={`timeline-container`}>
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

        {
          // Number section starts from here...
        }

        <section className='number-section'>
            <div className='num-header'>
               <p>OUR NUMBERS</p>
               <h1>The Numbers Don't Lie</h1>
               <p>We offer better rates than our competitor on your favorite assets like BTC, ETH, USDC, and USDT</p>
            </div>
 
            <ScrollTrigger onEnter={()=> setCounter(true)} onExit={()=> setCounter(false)}>
               {counter && (
                  <div className='num-countup' style={{color: 'white'}}>
                     <div>
                        <h1>$<CountUp start={0} end={20} duration={3} delay={0} />B+</h1>
                        <p>In community assets</p>
                     </div>
                     <div>
                        <h1>1M+</h1>
                        <p>Happy Crypyic users</p>
                     </div>
                     <div>
                        <h1><CountUp start={0} end={484} duration={2} delay={0} />M+</h1>
                        <p>Yield paid in last 12 months</p>
                     </div>
                     <div>
                        <h1><CountUp start={0} end={109} duration={2} delay={0} />k+</h1>
                        <p>Community BTC</p>
                     </div>
                  </div>
               )}
            </ScrollTrigger>
        </section>

        {
         // Team slider starts from here...
        }

        <section className='team-container'>
            <div className='num-header'>
               <p>MEET OUR TEAM</p>
               <h1>Our Mativated Team</h1>
            </div>
            <Carousel 
               responsive={responsive} 
               className='team-slider'
               infinite={true}
               autoPlay={true}
               autoPlaySpeed={3000}
               keyBoardControl={true}
            >
                 {
                     team.map((player, idx) =>{
                        const {pic, name, designation} = player
                        return (
                        <div className='team-slide'>
                           <div className="team-img-box">
                              <img src={pic} width="50px"/>
                              <div className="team-hidden-Intro">
                                 <h4>{name}</h4>
                                 <p>{designation}</p>
                              </div>
                           </div>
                           <div className='team-desc'>
                              <h4 className='team-player-name'>{name}</h4>
                              <div className='team-social'>
                                 <AiOutlineInstagram />
                                 <AiOutlineTwitter />
                                 <FaFacebookF />
                              </div>
                           </div>
                        </div>
                        )
                     })
                  }
            </Carousel>
        </section>

        {
         //FAQ section starts from here...
        }

        <section className='faq-container'>
            <p>FAQ</p>
            <h1>YOU HAVE QUESTIONS</h1>
            <div className='question-box'>
               {faqs.map((faq, idx) =>(
                  <div className='questions' key={idx} onClick={()=> toggleFAQ(idx)}>
                     <div className='question'>
                        <h3>{faq.question}</h3>
                        <span>{faqVisible === idx ? <AiOutlineMinus /> : <AiOutlinePlus />}</span>
                     </div>
                     <p>{faqVisible === idx && faq.answer}</p>
                  </div>
               ))}
            </div>
        </section>

        {
         //last banner starts from here...
        }

        <section className='last-banner'>
           <div className='last-info'>
              <h1>Also Available On IOS <br/> And Android</h1>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
              <div className='last-app-img'>
                  <div className='last-img'>
                     <img src={playStore} />
                  </div>
                  <div className='last-img'>
                     <img src={appStore} />
                  </div>           
              </div>
           </div>
           <img src={phoneImg} className='last-banner-img'/>
        </section>

        <section style={{minHeight: '150px'}}>
            <Footer />
        </section>

    </div>
  )
}

export default HomePage