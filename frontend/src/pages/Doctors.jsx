import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './../context/AppContext';

const Doctors = () => {
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilterDoc(doctors);
    } else {
      const term = searchTerm.toLowerCase();
      setFilterDoc(
        doctors.filter(
          (doc) =>
            doc.name.toLowerCase().includes(term) ||
            doc.speciality.toLowerCase().includes(term)
        )
      );
    }
  }, [doctors, searchTerm]);

  return (
    <div className="min-h-screen bg-[#405448] px-4 py-10 text-white">
      <div className="max-w-5xl mx-auto">

        {/* 🔍 Search Bar */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-center text-green-300 mb-4">Find a Doctor</h2>
          <input
            type="text"
            placeholder="Search by name or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-[#4e665b] text-white placeholder:text-green-200 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* 🧑‍⚕️ Doctors List */}
        <div className="space-y-6">
          {filterDoc.map((doc, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointment/${doc._id}`)}
              className="flex flex-col sm:flex-row gap-6 items-start bg-[#4e665b] rounded-xl shadow-md hover:shadow-green-200 p-4 transition-all cursor-pointer"
            >
              <div className="flex-shrink-0 w-full sm:w-48 h-48 bg-green-100 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="flex flex-col text-green-100 w-full">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-2xl font-bold text-green-200">{doc.name}</h3>
                  <span
                    className={`text-sm font-medium ${
                      doc.available ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {doc.available ? 'Available' : 'Not Available'}
                  </span>
                </div>
                <p className="mb-1">
                  <span className="font-semibold">Speciality:</span> {doc.speciality}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Degree:</span> {doc.degree}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Experience:</span> {doc.experience}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Fees:</span> ₹{doc.fees}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Address:</span> {doc.address.line1}, {doc.address.line2}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filterDoc.length === 0 && (
          <p className="text-center text-green-200 mt-10">No matching doctors found.</p>
        )}
      </div>
    </div>
  );
};

export default Doctors;
