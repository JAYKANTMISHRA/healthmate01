import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className="flex flex-col items-center bg-primary rounded-xl px-4 md:px-12 lg:px-20 py-10 md:py-16 my-8 shadow">
      {/* Large Horizontal Image */}
      <img
        src={assets.homepage01}
        alt="Healthcare"
        className="w-full max-w-4xl h-64 md:h-96 object-cover rounded-lg shadow-lg mb-8"
      />
      {/* Text Below Image */}
      <div className="w-full max-w-3xl flex flex-col items-center text-center gap-4">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
          Welcome to HealthMate
        </h1>
        <p className="text-white text-base md:text-lg opacity-90">
          Find the best doctors and book your appointments with ease. Your health and convenience are our top priorities.
        </p>
      </div>
    </div>
  )
}

export default Header
