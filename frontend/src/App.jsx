import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import MyAppointment from './pages/MyAppointment';
import Appointment from './pages/Appointment';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div className="relative">
      {/* Toast notifications */}
      <ToastContainer />

      {/* Fixed navbar */}
      <div className="fixed top-0 left-0 right-20 z-50  shadow">
        <Navbar />
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main content with top padding to avoid overlap with fixed navbar */}
      <div className="pt-[96px] ml-60 px-4 sm:px-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:speciality" element={<Doctors />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-appointment" element={<MyAppointment />} />
          <Route path="/appointment/:docId" element={<Appointment />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default App;
