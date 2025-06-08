import React, { useContext, useState } from "react";
import { assets } from "./../../assets/assets";
import { AdminContext } from './../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!docImg) {
        return toast.error('Image Not Selected');
      }
      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

      const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, { headers: { aToken } });

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName('');
        setPassword('');
        setEmail('');
        setAddress1('');
        setAddress2('');
        setDegree('');
        setAbout('');
        setFees('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex pt-24 items-center justify-center bg-[#44524a] px-4 py-10">
      <form onSubmit={onSubmitHandler} className="bg-primary rounded-2xl shadow-xl w-full max-w-3xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-[#44524a]">Add New Doctor</h2>

        <div className="flex flex-col items-center gap-3">
          <label htmlFor="doc-imag" className="cursor-pointer">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Doctor"
              className="w-24 h-24 rounded-full object-cover border-4 border-[#44524a] bg-gray-100"
            />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-imag" hidden />
          <p className="text-sm text-gray-500">Click to upload doctor picture</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Doctor Name"
              className="w-full border rounded px-3 py-2 mt-1" />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email"
              className="w-full border rounded px-3 py-2 mt-1" />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password"
              className="w-full border rounded px-3 py-2 mt-1" />
          </div>

          <div>
            <label className="block text-sm font-medium">Experience</label>
            <select value={experience} onChange={(e) => setExperience(e.target.value)}
              className="w-full border rounded px-3 py-2 mt-1">
              {[...Array(10)].map((_, i) => (
                <option key={i} value={`${i + 1} Year`}>{i + 1} Year</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Fees</label>
            <input type="number" value={fees} onChange={(e) => setFees(e.target.value)} required placeholder="Fees"
              className="w-full border rounded px-3 py-2 mt-1" />
          </div>

          <div>
            <label className="block text-sm font-medium">Speciality</label>
            <select value={speciality} onChange={(e) => setSpeciality(e.target.value)}
              className="w-full border rounded px-3 py-2 mt-1">
              <option>General physician</option>
              <option>Gynecologist</option>
              <option>Dermatologist</option>
              <option>Pediatricians</option>
              <option>Neurologist</option>
              <option>Gastroenterologist</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Education</label>
            <input type="text" value={degree} onChange={(e) => setDegree(e.target.value)} required placeholder="Degree"
              className="w-full border rounded px-3 py-2 mt-1" />
          </div>

          <div>
            <label className="block text-sm font-medium">Address Line 1</label>
            <input type="text" value={address1} onChange={(e) => setAddress1(e.target.value)} required placeholder="Address Line 1"
              className="w-full border rounded px-3 py-2 mt-1" />
          </div>

          <div>
            <label className="block text-sm font-medium">Address Line 2</label>
            <input type="text" value={address2} onChange={(e) => setAddress2(e.target.value)} required placeholder="Address Line 2"
              className="w-full border rounded px-3 py-2 mt-1" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">About</label>
          <textarea value={about} onChange={(e) => setAbout(e.target.value)} required placeholder="About the doctor"
            className="w-full border rounded px-3 py-2 mt-1" rows="3" />
        </div>

        <div className="text-center">
          <button type="submit" className="bg-[#44524a] hover:bg-[#3a463e] text-white px-8 py-3 rounded-full font-medium transition">
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
