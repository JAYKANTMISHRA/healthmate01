import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "./../../assets/assets";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { aToken, getDashData, dashData } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) getDashData();
  }, [aToken]);

  return (
    dashData && (
      <div className="min-h-screen px-4 pt-24 pb-8 bg-[#44524a]">
        <h1 className="text-3xl font-bold text-white mb-6">Latest Appointment</h1>

        <div className="grid gap-6">
          {dashData.latestAppointments.map((item, index) => (
            <div
              key={index}
              className="bg-primary shadow-lg rounded-xl p-6 flex items-center justify-between border-l-8 border-[#44524a]"
            >
              <div className="flex items-center gap-4">
                <img
                  className="w-16 h-16 rounded-full object-cover border border-gray-300"
                  src={item.docData.image}
                  alt={item.docData.name}
                />
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {item.docData.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>
              </div>

              <div>
                {item.cancelled ? (
                  <span className="px-4 py-1 text-sm rounded-full bg-red-100 text-red-600 font-medium">
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="px-4 py-1 text-sm rounded-full bg-green-100 text-green-700 font-medium">
                    Completed
                  </span>
                ) : (
                  <span className="px-4 py-1 text-sm rounded-full bg-yellow-100 text-yellow-600 font-medium">
                    Upcoming
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Dashboard;
