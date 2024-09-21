import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileAsync } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import {
  FaUser,
  FaEnvelope,
  FaUserTag,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";

const Profile = () => {
  const dispatch = useDispatch();
  const {
    _id,
    username,
    email,
    role,
    photo,
    isLoading,
    error,
    isAuthenticated,
  } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ username: "" });
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (username) {
      setFormData({ username: username || "" });
    }
  }, [username]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("_id", _id);
    formDataToSend.append("username", formData.username);
    if (selectedFile) {
      formDataToSend.append("photo", selectedFile);
    }

    // console.log("FormData being sent:", Object.fromEntries(formDataToSend));

    try {
      await dispatch(updateProfileAsync(formDataToSend)).unwrap();
      //   console.log("Update profile result:", result);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.message || "Failed to update profile");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-8">Error: {error}</div>;
  }

  if (!isAuthenticated || !username) {
    return (
      <div className="text-center mt-8">
        No user data available. Please try logging in again.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">User Profile</h1>
      {isEditing ? (
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 rounded-lg shadow"
        >
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              disabled
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>
          <div>
            <label
              htmlFor="photo"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Profile Photo
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />
            <div className="flex items-center space-x-4">
              <img
                src={selectedFile ? URL.createObjectURL(selectedFile) : photo}
                alt="Profile preview"
                className="w-20 h-20 rounded-full object-cover"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-300"
              >
                Choose File
              </button>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              <FaSave className="mr-2" /> Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex items-center justify-center px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-300"
            >
              <FaTimes className="mr-2" /> Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow space-y-6">
          <div className="flex items-center space-x-6">
            <img
              src={photo}
              alt={username}
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {username}
              </h2>
              <p className="text-gray-600">{role}</p>
            </div>
          </div>
          <div className="space-y-4">
            <p className="flex items-center text-gray-700">
              <FaUser className="mr-3 text-blue-500" />
              <strong className="w-24">Username:</strong>
              <span className="ml-2">{username}</span>
            </p>
            <p className="flex items-center text-gray-700">
              <FaEnvelope className="mr-3 text-blue-500" />
              <strong className="w-24">Email:</strong>
              <span className="ml-2">{email}</span>
            </p>
            <p className="flex items-center text-gray-700">
              <FaUserTag className="mr-3 text-blue-500" />
              <strong className="w-24">Role:</strong>
              <span className="ml-2">{role}</span>
            </p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            <FaEdit className="mr-2" /> Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
