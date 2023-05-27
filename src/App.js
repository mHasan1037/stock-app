import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/homepage/HomePage';
import Navbar from './components/Navbar';
import Exchange from './pages/exchange/Exchange';
import AboutUs from './pages/aboutus/AboutUs';
import ContactUs from './pages/contactUs/ContactUs';
import Footer from './components/Footer';
import { useState } from 'react';
import { StockContext } from './hooks/StockContext';

function App() {
  const [passData, setPassData] = useState({})

  const fetchStock = (data) =>{
    setPassData(data)
  }

  return (
    <StockContext.Provider value={{fetchStock, passData}}>
      <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/stock-app' element={<HomePage />} />
            <Route path='/exchange' element={<Exchange />} />
            <Route path='/aboutUs' element={<AboutUs />} />
            <Route path='/contactUs' element={<ContactUs />} />
            <Route path='/' element={<HomePage />} />
            <Route path='/' element={<HomePage />} />
        </Routes>
        {
          /*
          https://crypto.com/ 
          */
        }
        <Footer />
      </BrowserRouter>
    </StockContext.Provider>
  );
}

export default App;
