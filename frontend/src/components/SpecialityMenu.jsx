import React from 'react';
import { Link } from 'react-router-dom';
import { specialityData } from '../assets/assets';
import { ArrowRight } from 'lucide-react';

const SpecialityMenu = () => {
  return (
    <section className="py-20 px-4 bg-primary" id="speciality">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Browse by Speciality</h2>
        <p className="text-gray-600 text-sm sm:text-base mb-10">
          Simply browse through our trusted specialists and book appointments easily.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {specialityData.map((item, index) => (
            <Link
              to={`/doctors/${item.speciality}`}
              onClick={() => scrollTo(0, 0)}
              key={index}
              className="bg-green-50 p-6 rounded-xl shadow-sm hover:shadow-lg border border-green-100 text-left hover:-translate-y-1 transition-all"
            >
              {/* Icon inside soft box */}
              <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-4 bg-green-100">
                <img
                  src={item.image}
                  alt={item.speciality}
                  className="w-6 h-6 object-contain"
                />
              </div>

              {/* Title and text */}
              <h3 className="font-semibold text-gray-800 text-sm mb-1">{item.speciality}</h3>
              <p className="text-gray-500 text-xs">{item.doctors}</p>

              {/* Arrow */}
              <ArrowRight className="text-gray-400 w-4 h-4 mt-2" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialityMenu;
