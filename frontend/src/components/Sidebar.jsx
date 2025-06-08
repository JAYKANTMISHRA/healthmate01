import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import {
  Home,
  CalendarPlus,
  ClipboardList,
  LogOut,
  UserCircle,
} from 'lucide-react';
import { assets } from '../assets/assets';



const Sidebar = () => {
  const { token, userData, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(false);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="fixed top-[96px] left-0 w-60 h-[calc(100vh-96px)] bg-[#405448] text-white shadow-lg z-40">
      <div className="flex flex-col gap-4 p-6 text-lg font-medium">

        {/* Always visible: Home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
              isActive ? 'bg-green-700' : 'hover:bg-green-600'
            }`
          }
        >
          <Home size={20} /> Home
        </NavLink>

        {/* Only after login */}
        {token && (
          <>
            {/* My Profile */}
            <div
              onClick={() => navigate('/my-profile')}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-green-600 cursor-pointer transition"
            >
              <img
                src={userData?.image || assets.defaultprofile}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span>My Profile</span>
            </div>

            {/* Book Appointment */}
            <NavLink
              to="/doctors"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive ? 'bg-green-700' : 'hover:bg-green-600'
                }`
              }
            >
              <CalendarPlus size={20} /> Book Appointment
            </NavLink>

            {/* My Appointments */}
            <NavLink
              to="/my-appointment"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive ? 'bg-green-700' : 'hover:bg-green-600'
                }`
              }
            >
              <ClipboardList size={20} /> My Appointments
            </NavLink>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 mt-2 rounded-lg hover:bg-red-600 transition"
            >
              <LogOut size={20} /> Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
