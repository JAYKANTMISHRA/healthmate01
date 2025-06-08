import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
  const [localAppointments, setLocalAppointments] = useState([]);

  useEffect(() => {
    if (dToken) getAppointments();
  }, [dToken]);

  useEffect(() => {
    if (appointments.length > 0) {
      setLocalAppointments([...appointments].reverse());
    }
  }, [appointments]);

  const handleCancel = async (id) => {
    await cancelAppointment(id);
    setLocalAppointments((prev) =>
      prev.map((a) => (a._id === id ? { ...a, cancelled: true } : a))
    );
  };

  const handleComplete = async (id) => {
    await completeAppointment(id);
    setLocalAppointments((prev) =>
      prev.map((a) => (a._id === id ? { ...a, isCompleted: true } : a))
    );
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-[#44524a]">
      <h1 className="text-2xl font-bold text-white mb-6">All Appointments</h1>

      <div className="grid gap-6">
        {localAppointments.length === 0 ? (
          <div className="bg-white text-center text-gray-500 shadow-md rounded-xl p-6">
            No appointments found
          </div>
        ) : (
          localAppointments.map((item, index) => (
            <div
              key={item._id}
              className="bg-primary rounded-xl shadow-lg p-6 border-l-8 border-[#44524a] flex flex-col sm:flex-row sm:justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                <img
                  src={item.userData.image||assets.defaultprofile}
                  alt={item.userData.name}
                  className="w-16 h-16 rounded-full border-2 border-[#44524a]"
                />
                <div className="text-gray-800">
                  <p className="text-lg font-semibold">{item.userData.name}</p>
                  <p className="text-sm text-gray-500">
                    Age: {calculateAge(item.userData.dob)} |{" "}
                    {item.payment ? "Online" : "Cash"} Payment
                  </p>
                  <p className="text-sm mt-1">
                    <strong>Date:</strong> {slotDateFormat(item.slotDate)} @ {item.slotTime}
                  </p>
                  <p className="text-sm">
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
                  <span className="bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-medium">
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium">
                    Completed
                  </span>
                ) : (
                  <>
                    <button
                      onClick={() => handleCancel(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm rounded-lg transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleComplete(item._id)}
                      className="bg-[#44524a] hover:bg-[#38463f] text-white px-4 py-2 text-sm rounded-lg transition"
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

export default DoctorAppointments;
