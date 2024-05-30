import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import ForgotPassword from "./forgotpassword";
import AboutPage from './About';
import Contact from './Contactus';
import Doctors from './Doctorsearch';
import Header from './Header';
import Footer from './Footer';
import MyProfile from './MyProfile'
import Details from './Details'

import Appointment from './Appointment';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/about' element={<AboutPage />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/doctors' element={<Doctors />}></Route>
        <Route path='myprofile/*' element={<MyProfile />}></Route>
        <Route path='/forgotpassword' element={<ForgotPassword />}></Route>
        <Route path='/details' element={<Details />}></Route>
        <Route path='/appointment' element={<Appointment />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
