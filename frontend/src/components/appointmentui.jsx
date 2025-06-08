import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ShieldCheck, Clock, Phone } from 'lucide-react';

const AppointmentSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-green-600 text-white py-20 text-center">
      <h2 className="text-4xl font-bold mb-4">Ready to Book Your Appointment?</h2>
      <p className="text-lg mb-8">
        Take the first step towards better health. Schedule your consultation<br />
        with our expert doctors today.
      </p>
      <button
        onClick={() => navigate('/doctors')}
        className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg text-lg flex items-center justify-center gap-2 mx-auto mb-10 hover:bg-blue-100 transition"
      >
        <Calendar size={20} />
        Book Appointment Now
      </button>
      <div className="flex justify-center gap-10 text-sm font-medium">
        <div className="flex items-center gap-2">
          <Clock size={18} />
          Quick & Easy Booking
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck size={18} />
          100% Secure
        </div>
        
      </div>
    </section>
  );
};

export default AppointmentSection;
