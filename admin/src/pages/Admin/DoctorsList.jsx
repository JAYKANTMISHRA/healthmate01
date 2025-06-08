import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll bg-[#44524a] p-6 rounded-xl'>
      <h1 className='text-2xl text-white font-semibold mb-6'>All Doctors</h1>
      <div className='flex flex-col gap-6'>
        {doctors.map((item, index) => (
          <div key={index} className='flex items-center bg-primary rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300'>
            <img
              src={item.image}
              alt={item.name}
              className='w-36 h-36 object-cover rounded-l-xl'
            />
            <div className='flex-1 p-4'>
              <p className='text-xl font-bold text-[#44524a]'>{item.name}</p>
              <p className='text-gray-600'>{item.speciality}</p>
            </div>
            <div className='p-4 flex items-center'>
              <button
                onClick={() => changeAvailability(item._id)}
                className={`px-5 py-2 rounded-full font-semibold text-sm transition ${
                  item.available
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                }`}
              >
                {item.available ? 'Available' : 'Unavailable'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
