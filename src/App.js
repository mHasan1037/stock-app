import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/homepage/HomePage';
import Navbar from './components/Navbar';
import Exchange from './pages/exchange/Exchange';
import AboutUs from './pages/aboutus/AboutUs';
import ContactUs from './pages/contactUs/ContactUs';
import LoginPage from './pages/loginPage/LoginPage';
import SignUp from './pages/signUp/SignUp';

function App() {

  return (
    <BrowserRouter>
       <Navbar />
       <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/stock-app' element={<HomePage />} />
          <Route path='/exchange' element={<Exchange />} />
          <Route path='/aboutUs' element={<AboutUs />} />
          <Route path='/contactUs' element={<ContactUs />} />
          <Route path='/loginPage' element={<LoginPage />} />
          <Route path='/signUp' element={<SignUp />} />
       </Routes>
       {
        /*
        https://crypto.com/ 
        */
       }
    </BrowserRouter>
  );
}

export default App;
