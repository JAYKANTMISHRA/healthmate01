import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';

const Navbar = () => {
  const { aToken, setAtoken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate('/');
    if (aToken) {
      setAtoken('');
      localStorage.removeItem('aToken');
    }
    if (dToken) {
      setDToken('');
      localStorage.removeItem('dToken');
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#405448] text-white flex flex-wrap justify-between items-center px-4 sm:px-10 py-3 shadow-md">
      {/* Brand Logo & User Role */}
      <div className="flex items-center gap-3">
        <img
          src={assets.healthmatelogo}
          alt="HealthMate Logo"
          className="w-12 h-12 object-contain rounded-full"
        />
        <div>
          <p className="text-2xl font-bold tracking-wider">HEALTH MATE</p>
          <p className="text-xs bg-white text-[#405448] px-2 py-0.5 rounded-full inline-block mt-1">
            {aToken ? 'Admin' : 'Doctor'}
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-4 flex-wrap items-center text-sm font-medium">
        {aToken && (
          <>
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                isActive
                  ? 'underline underline-offset-4 font-bold text-green-300'
                  : 'hover:underline'
              }
            >
              Dashboard
            </NavLink>
            <NavLink to="/all-appointments" className="hover:underline">
              Appointments
            </NavLink>
            <NavLink to="/add-doctor" className="hover:underline">
              Add Doctors
            </NavLink>
            <NavLink to="/doctor-list" className="hover:underline">
              Doctors List
            </NavLink>
          </>
        )}

        {dToken && (
          <>
            <NavLink to="/doctor-dashboard" className="hover:underline">
              Dashboard
            </NavLink>
            <NavLink to="/doctor-appointments" className="hover:underline">
              Appointments
            </NavLink>
            <NavLink to="/doctor-profile" className="hover:underline">
              Profile
            </NavLink>
          </>
        )}

        <button
          onClick={logout}
          className="ml-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
