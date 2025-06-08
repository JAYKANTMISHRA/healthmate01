import React, { useEffect, useContext, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from './../../assets/assets';


const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { slotDateFormat } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (dToken) getDashData();
  }, [dToken]);

  useEffect(() => {
    if (dashData?.latestAppointments) {
      setAppointments(dashData.latestAppointments);
    }
  }, [dashData]);

  const handleComplete = async (id) => {
    await completeAppointment(id);
    setAppointments((prev) =>
      prev.map((a) => (a._id === id ? { ...a, isCompleted: true } : a))
    );
  };

  const handleCancel = async (id) => {
    await cancelAppointment(id);
    setAppointments((prev) =>
      prev.map((a) => (a._id === id ? { ...a, cancelled: true } : a))
    );
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-[#44524a]">
      <h1 className="text-3xl font-bold text-white mb-6">Doctor Dashboard</h1>

      <div className="grid gap-6">
        {appointments.length === 0 ? (
          <div className="bg-primary shadow rounded-xl p-6 text-center text-gray-500">
            No appointments found
          </div>
        ) : (
          appointments.map((item) => (
            <div
              key={item._id}
              className="bg-primary shadow-lg rounded-xl p-6 flex items-center justify-between border-l-8 border-[#44524a]"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.userData.image || assets.defaultprofile}
                  alt={item.userData.name}
                  className="w-16 h-16 rounded-full border-2 border-[#44524a]"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-800">{item.userData.name}</p>
                  <p className="text-sm text-gray-600">{slotDateFormat(item.slotDate)}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {item.cancelled ? (
                  <span className="px-4 py-1 text-sm rounded-full bg-red-100 text-red-600 font-medium">Cancelled</span>
                ) : item.isCompleted ? (
                  <span className="px-4 py-1 text-sm rounded-full bg-green-100 text-green-700 font-medium">Completed</span>
                ) : (
                  <>
                    <button
                      onClick={() => handleCancel(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-xl transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleComplete(item._id)}
                      className="bg-[#44524a] hover:bg-[#38463f] text-white text-sm px-4 py-2 rounded-xl transition"
                    >
                      Complete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
