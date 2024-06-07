import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import ForgotPassword from "./forgotpassword";
import AboutPage from './About';
import Contact from './Contactus';
import Doctors from './Doctorsearch';
import DoctorsDashboard from './DoctorsDashboard';

import Header from './Header';
import Footer from './Footer';
import Details from './Details'
import MyProfile from './MyProfile'
import DoctorsProfile from './DoctorsProfile'
import ReceptionistProfile from './ReceptionistProfile';

import Appointment from './Appointment';


function App() {
  // Assuming you have access to the user's role
  const userRole = "doctor"; // Example role, replace it with the actual user role
  
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
        <Route path='/doctorsdashboard' element={<DoctorsDashboard />}></Route>
        {/* Conditionally render MyProfile or DoctorsProfile based on user's role */}
        <Route path='myprofile/*' element={userRole === "doctor" ? <DoctorsProfile /> : userRole === "receptionist" ? <ReceptionistProfile /> : <MyProfile />}></Route>
        <Route path='/forgotpassword' element={<ForgotPassword />}></Route>
        <Route path='/details' element={<Details />}></Route>
        <Route path='/appointment' element={<Appointment />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
