import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from './../../assets/assets';

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) getAllAppointments();
  }, [aToken]);

  return (
    <div className="min-h-screen px-4 py-8  pt-24 bg-[#44524a]">
      <h1 className="text-2xl font-bold text-white mb-6">All Appointments</h1>

      <div className="grid gap-6 max-w-6xl mx-auto">
        {appointments.length === 0 ? (
          <div className="bg-primary text-center text-gray-500 shadow-md rounded-xl p-6">
            No appointments found
          </div>
        ) : (
          appointments.reverse().map((item, index) => (
            <div
              key={item._id}
              className="bg-primary rounded-xl shadow-lg p-6 border-l-8 border-[#44524a] flex flex-col sm:flex-row sm:justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                <img
                  src={item.userData.image || assets.defaultprofile}
                  alt={item.userData.name}
                  className="w-16 h-16 rounded-full border-2 border-[#44524a]"
                />
                <div className="text-gray-800">
                  <p className="text-lg font-semibold">{item.userData.name}</p>
                  <p className="text-sm text-gray-500">
                    Age: {calculateAge(item.userData.dob)}
                  </p>
                  <p className="text-sm mt-1">
                    <strong>Date:</strong> {slotDateFormat(item.slotDate)} @ {item.slotTime}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <img
                      src={item.docData.image || assets.defaultprofile}
                      alt={item.docData.name}
                      className="w-8 h-8 rounded-full border"
                    />
                    <p className="text-sm text-gray-700">{item.docData.name}</p>
                  </div>
                  <p className="text-sm mt-1">
                    <strong>Fees:</strong> {currency}
                    {item.amount}
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    <strong>Symptoms:</strong> {item.message || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex sm:flex-col gap-3 justify-center sm:items-end">
                {item.cancelled ? (
                  <button
                    className="bg-red-200 text-red-700 px-4 py-1 rounded-full text-sm font-medium cursor-not-allowed"
                    disabled
                  >
                    Cancelled
                  </button>
                ) : item.isCompleted ? (
                  <button
                    className="bg-green-200 text-green-700 px-4 py-1 rounded-full text-sm font-medium cursor-not-allowed"
                    disabled
                  >
                    Completed
                  </button>
                ) : (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-full text-sm font-medium"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllAppointments;
