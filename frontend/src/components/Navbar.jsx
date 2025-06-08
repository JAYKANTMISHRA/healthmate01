import React, { useContext, useState } from 'react';
import { assets } from './../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
  };

  return (
    <div className="fixed top-0 left-0 right-0 w-full flex items-center justify-between text-sm py-4 border-b bg-primary border-gray-400 z-50 px-4 md:px-10">
      {/* Logo */}
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
        <img
          src={assets.healthmatelogo}
          alt="HealthMate Logo"
          className="w-32 h-20 object-contain rounded-lg"
        />
        <span className="text-3xl md:text-4xl font-bold text-green-900">
          HEALTH MATE
        </span>
      </div>

      {/* Right side buttons */}
      <div className="flex items-center gap-4">
        {!token ? (
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-white text-xl px-3 py-2 rounded-full font-light hidden md:block"
          >
            Sign In
          </button>
        ) : (
          <img
            onClick={() => navigate('/my-profile')}
            className="w-9 h-9 rounded-full object-cover cursor-pointer"
            src={userData?.image || assets.defaultprofile}
            alt="User Profile"
            title="Go to Profile"
          />
        )}

        {/* Always show Admin/Doctor Panel */}
        <a
          href="https://healthmate-adminpanel1.onrender.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.preventDefault();
            window.open(
              'https://healthmate-adminpanel1.onrender.com',
              '_blank',
              'noopener,noreferrer'
            );
          }}
          className="bg-green-600 text-white font-medium py-2 px-4 rounded-full hover:bg-green-700 transition duration-300 hidden md:block"
        >
          Admin/Doctor Panel
        </a>

        {/* Mobile menu icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="Menu"
        />
      </div>

      {/* Mobile menu (empty except close button) */}
      {showMenu && (
        <div className="fixed top-0 right-0 bottom-0 w-full bg-white z-20">
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} alt="Logo" />
            <img
              className="w-7 cursor-pointer"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt="Close"
            />
          </div>
          {/* No nav links here as requested */}
        </div>
      )}
    </div>
  );
};

export default Navbar;
