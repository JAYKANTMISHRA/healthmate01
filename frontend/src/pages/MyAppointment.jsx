import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MyAppointment = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointment] = useState([]);
  const navigate = useNavigate();

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return `${dateArray[0]} ${months[Number(dateArray[1])]}, ${dateArray[2]}`;
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', {
        headers: { token },
      });
      if (data.success) {
        setAppointment(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/cancel-appointment',
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + '/api/user/verifyRazorpay',
            response,
            { headers: { token } }
          );
          if (data.success) {
            getUserAppointments();
            navigate('/my-appointment');
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/payment-razorpay',
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  const getInitials = (name) => name.split(" ").map(w => w[0]).join("").toUpperCase();

  return (
    <div className="p-4 sm:p-8" style={{ backgroundColor: '#405448', minHeight: '100vh' }}>
      <h2 className="pb-4 text-xl text-green-100 border-b border-green-300 font-semibold">My Appointments</h2>
      <div className="grid gap-6 mt-6">
        {appointments.map((item, index) => (
          <div key={index} className="bg-white text-green-950 rounded-lg shadow-md p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            {/* Doctor info */}
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              <div className="w-12 h-12 rounded-full bg-green-300 flex items-center justify-center font-bold text-white">
                {getInitials(item.docData.name)}
              </div>
              <div>
                <h3 className="font-bold text-lg">{item.docData.name}</h3>
                <p className="text-sm">{item.docData.speciality}</p>
                <p className="text-sm text-yellow-700">⭐ {item.docData.experience} years</p>
              </div>
              <span className="ml-4 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full font-medium">
                {item.cancelled ? 'cancelled' : item.isCompleted ? 'completed' : 'confirmed'}
              </span>
            </div>

            {/* Appointment details */}
            <div className="text-sm text-left sm:text-center sm:w-1/2">
              <div className="flex items-center gap-4 justify-between">
                <div>
                  <p className="font-medium">📅 {slotDateFormat(item.slotDate)}</p>
                  <p className="font-medium">⏰ {item.slotTime}</p>
                </div>
                <div className="text-sm">
                  <p>{item.docData.address.line1}</p>
                  <p>{item.docData.address.line2}</p>
                  <p>Type: {item.docData.type || 'Consultation'}</p>
                  <p>Duration: {item.docData.duration || '30 min'}</p>
                  <p className="font-bold text-green-800">₹{item.amount}</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-2 sm:items-end mt-4 sm:mt-0">
              {item.cancelled && !item.isCompleted && (
                <button className="px-4 py-2 bg-red-100 text-red-800 border border-red-400 rounded">Appointment Cancelled</button>
              )}
              {item.isCompleted && (
                <button className="px-4 py-2 bg-green-100 text-green-800 border border-green-400 rounded">Completed</button>
              )}
              {!item.cancelled && !item.payment && !item.isCompleted && (
                <>
                  <button
                    onClick={() => appointmentRazorpay(item._id)}
                    className="px-4 py-2 bg-black text-white border border-green-700 rounded hover:bg-green-700 hover:text-white transition"
                  >
                    💳 Pay Online
                  </button>
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="px-4 py-2 text-red-800 border border-red-500 rounded hover:bg-red-600 hover:text-white transition"
                  >
                    ❌ Cancel
                  </button>
                </>
              )}
              {!item.cancelled && item.payment && !item.isCompleted && (
                <button className="px-4 py-2 bg-green-100 text-green-800 border border-green-400 rounded">Paid</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointment;
