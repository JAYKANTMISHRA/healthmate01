import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from './../assets/assets';

const MyProfile = () => {
  const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      if (image) formData.append('image', image);

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, {
        headers: { token },
      });

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return userData && (
    <div className="min-h-screen bg-[#405448] flex justify-center items-start py-10 px-4 text-white font-[Outfit]">
      <div className="bg-primary text-black w-full max-w-2xl rounded-xl shadow-lg p-8 space-y-6 text-lg">
        
        {/* Profile image and name centered */}
        <div className="flex flex-col items-center gap-4">
          <label htmlFor="image" className="relative cursor-pointer">
            {isEdit ? (
              <>
                <img
                  className="h-40 w-40 rounded-full object-cover border-4"
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : userData.image
                        ? userData.image
                        : assets.defaultprofile
                  }
                  alt="Profile"
                />
                <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} hidden />
              </>
            ) : (
              <img
                className="h-40 w-40 rounded-full object-cover border-4"
                src={userData.image ? userData.image : assets.defaultprofile}
                alt="Profile"
              />
            )}
          </label>
          {isEdit ? (
            <input
              className="text-xl font-semibold bg-gray-100 rounded px-4 py-2 text-center"
              type="text"
              value={userData.name}
              onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
            />
          ) : (
            <h2 className="text-2xl font-semibold">{userData.name}</h2>
          )}
        </div>

        {/* Profile Fields */}
        <div className="space-y-4">
          <div className="flex gap-4">
            <span className="w-28 font-semibold">Email:</span>
            <span className="text-blue-600 break-all">{userData.email}</span>
          </div>

          <div className="flex gap-4">
            <span className="w-28 font-semibold">Phone:</span>
            {isEdit ? (
              <input
                className="bg-gray-100 px-3 py-2 rounded w-full"
                value={userData.phone}
                onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
              />
            ) : (
              <span>{userData.phone}</span>
            )}
          </div>

          <div className="flex gap-4">
            <span className="w-28 font-semibold">Address:</span>
            {isEdit ? (
              <div className="flex flex-col gap-2 w-full">
                <input
                  className="bg-gray-100 px-3 py-2 rounded"
                  placeholder="Line 1"
                  value={userData.address.line1}
                  onChange={(e) => setUserData(prev => ({
                    ...prev, address: { ...prev.address, line1: e.target.value }
                  }))}
                />
                <input
                  className="bg-gray-100 px-3 py-2 rounded"
                  placeholder="Line 2"
                  value={userData.address.line2}
                  onChange={(e) => setUserData(prev => ({
                    ...prev, address: { ...prev.address, line2: e.target.value }
                  }))}
                />
              </div>
            ) : (
              <span>{userData.address.line1}<br />{userData.address.line2}</span>
            )}
          </div>

          <div className="flex gap-4">
            <span className="w-28 font-semibold">Gender:</span>
            {isEdit ? (
              <select
                className="bg-gray-100 px-3 py-2 rounded max-w-[140px]"
                value={userData.gender}
                onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <span>{userData.gender || 'Not selected'}</span>
            )}
          </div>

          <div className="flex gap-4">
            <span className="w-28 font-semibold">Birthday:</span>
            {isEdit ? (
              <input
                className="bg-gray-100 px-3 py-2 rounded"
                type="date"
                value={userData.dob}
                onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
              />
            ) : (
              <span>{userData.dob || 'Not selected'}</span>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          {isEdit ? (
            <button
              className="bg-[#405448] text-white px-6 py-2 rounded-full hover:bg-[#324136] transition-all text-lg"
              onClick={updateUserProfileData}
            >
              Save Information
            </button>
          ) : (
            <button
              className="bg-[#405448] text-white px-6 py-2 rounded-full hover:bg-[#324136] transition-all text-lg"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
