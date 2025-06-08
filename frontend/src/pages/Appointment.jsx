import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const navigate = useNavigate();
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const [message, setMessage] = useState(''); // 🔥 New: message (symptoms)

  const fetchDocInfo = () => {
    const doc = doctors.find(doc => doc._id === docId);
    setDocInfo(doc);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        const slotDate = `${day}_${month}_${year}`;
        const slotAvailable = !(docInfo?.slots_booked[slotDate]?.includes(formattedTime));

        if (slotAvailable) {
          timeSlots.push({ datetime: new Date(currentDate), time: formattedTime });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots(prev => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment');
      return navigate('/login');
    }

    if (!slotTime) {
      return toast.error('Please select a time slot');
    }

    if (message.trim() === '') {
      return toast.error('Please enter symptoms or message');
    }

    try {
      const date = docSlots[slotIndex][0].datetime;
      let slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        {
          docId,
          slotDate,
          slotTime,
          message, // Send message to backend
        },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointment');
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  return docInfo && (
    <div className="min-h-screen bg-[#405448] text-white py-10 px-4 sm:px-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left - Doctor Info */}
        <div className="bg-white text-[#405448] p-6 rounded-xl shadow-md">
          <img src={docInfo.image} alt="Doctor" className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-green-500" />
          <h2 className="text-xl font-semibold text-center mt-4">{docInfo.name}</h2>
          <p className="text-center text-sm text-gray-600 mt-1">{docInfo.degree} - {docInfo.speciality}</p>
          <div className="text-sm text-center mt-3">
            <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full">{docInfo.experience}</span>
          </div>
          <div className="flex justify-around text-sm text-gray-700 mt-4">
            <div className="text-center">
              <p className="text-lg font-bold text-green-600">500+</p>
              <p>Patients</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-green-600">98%</p>
              <p>Success</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-green-600">4.9</p>
              <p>Rating</p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">Consultation Fee</p>
            <p className="text-xl font-semibold text-green-600">{currencySymbol}{docInfo.fees}</p>
          </div>
        </div>

        {/* Right - Booking */}
        <div className="md:col-span-2 bg-white text-[#405448] p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Select Date</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {docSlots.length > 0 && docSlots.map((item, index) => (
              <div
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`min-w-16 px-4 py-3 rounded-xl text-center cursor-pointer font-medium ${
                  slotIndex === index ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                <p>{daysOfWeek[item[0]?.datetime.getDay()]}</p>
                <p>{item[0]?.datetime.getDate()}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold mt-6 mb-2">Available Time Slots</h3>
          <div className="flex gap-3 flex-wrap">
            {docSlots[slotIndex] &&
              docSlots[slotIndex].map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm px-4 py-2 rounded-full border transition-all ${
                    slotTime === item.time
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 border-gray-300'
                  }`}
                >
                  {item.time.toLowerCase()}
                </button>
              ))}
          </div>

          {/*  Symptoms Textarea */}
          <h3 className="text-lg font-semibold mt-6 mb-2">Enter Your Symptoms</h3>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Write your symptoms or reason for appointment..."
            className="w-full h-24 border border-gray-300 rounded-lg px-4 py-2 text-sm resize-none focus:outline-none focus:ring focus:ring-green-300"
          ></textarea>

          {/* Booking Summary & Button */}
          <div className="mt-6 flex justify-between items-center bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-xl text-white">
            <div>
              <p className="font-semibold text-lg">Booking Summary</p>
              <p className="text-sm mt-1">{daysOfWeek[docSlots[slotIndex]?.[0]?.datetime.getDay()]} {docSlots[slotIndex]?.[0]?.datetime.getDate()}</p>
              <p className="text-sm">{slotTime || 'Select a time'}</p>
              <p className="text-sm">{docInfo.name}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">{currencySymbol}{docInfo.fees}</p>
              <button
                onClick={bookAppointment}
                className="mt-2 bg-white text-green-600 font-semibold py-1.5 px-5 rounded-full"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
