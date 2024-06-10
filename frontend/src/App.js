import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import ForgotPassword from './forgotpassword';
import AboutPage from './About';
import Contact from './Contactus';
import Doctors from './Doctorsearch';
import DoctorsDashboard from './DoctorsDashboard';

import Header from './Header';
import Footer from './Footer';
import Details from './Details';
import MyProfile from './MyProfile';
import DoctorsProfile from './DoctorsProfile';
import ReceptionistProfile from './ReceptionistProfile';

import ProtectedRoute from './ProtectedRoute';
import Appointment from './Appointment';

// Importing useUser hook assuming you have a UserContext
import { useUser } from './UserContext';

function App() {
  // Assuming you have access to the user's role and authentication status
  const { user } = useUser(); // Access user data from context
  const isAuthenticated = user !== null;
  const userRole = user?.role; // Assuming user object has a 'role' property

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/details" element={<Details />} />

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={['doctor', 'receptionist']} userRole={userRole} />}>
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="/doctorsdashboard" element={<DoctorsDashboard />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="myprofile/*" element={userRole === 'doctor' ? (<DoctorsProfile />) : userRole === 'receptionist' ? (<ReceptionistProfile />) : (<MyProfile />)} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
