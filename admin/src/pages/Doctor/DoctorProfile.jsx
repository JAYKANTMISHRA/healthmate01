import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };
      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (dToken) getProfileData();
  }, [dToken]);

  return (
    profileData && (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-[#44524a] px-4 py-8">
        <div className="w-full max-w-xl bg-primary rounded-2xl shadow-md p-8 space-y-6">
          <div className="flex flex-col items-center">
            <img
              className="w-32 h-32 rounded-full object-cover border-4 border-[#44524a]"
              src={profileData.image}
              alt="Doctor"
            />
            <h2 className="text-2xl font-semibold text-[#44524a] mt-4">
              {profileData.name}
            </h2>
            <p className="text-gray-600 mt-1">
              {profileData.degree} - {profileData.speciality}
            </p>
            <span className="text-sm mt-1 bg-[#e4eae8] px-3 py-1 rounded-full">
              {profileData.experience}
            </span>
          </div>

          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <label className="block font-medium text-[#44524a] mb-1">
                Appointment Fee:
              </label>
              {isEdit ? (
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={profileData.fees}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      fees: e.target.value,
                    }))
                  }
                />
              ) : (
                <p className="text-base">
                  {currency} {profileData.fees}
                </p>
              )}
            </div>

            <div>
              <label className="block font-medium text-[#44524a] mb-1">
                Address Line 1:
              </label>
              {isEdit ? (
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={profileData.address.line1}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        line1: e.target.value,
                      },
                    }))
                  }
                />
              ) : (
                <p>{profileData.address.line1}</p>
              )}
            </div>

            <div>
              <label className="block font-medium text-[#44524a] mb-1">
                Address Line 2:
              </label>
              {isEdit ? (
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={profileData.address.line2}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        line2: e.target.value,
                      },
                    }))
                  }
                />
              ) : (
                <p>{profileData.address.line2}</p>
              )}
            </div>

            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                checked={profileData.available}
                onChange={() =>
                  isEdit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
              />
              <label className="text-[#44524a]">Available for Appointments</label>
            </div>

            <div className="pt-6 text-center">
              {isEdit ? (
                <button
                  onClick={updateProfile}
                  className="bg-[#44524a] hover:bg-[#38463f] text-white px-6 py-2 rounded-lg"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="bg-[#44524a] hover:bg-[#38463f] text-white px-6 py-2 rounded-lg"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
