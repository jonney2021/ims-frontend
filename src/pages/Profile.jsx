import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAsync } from "../redux/features/user/userSlice";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../redux/features/auth/authSlice";
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
import { Navigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, username, email, role, photo, isLoading } =
    useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    photo: "",
  });

  useEffect(() => {
    // console.log("Profile component mounted. Auth state:", {
    //   isAuthenticated,
    //   username,
    //   email,
    //   role,
    //   photo,
    //   isLoading,
    // });
    if (isAuthenticated && (!username || !email)) {
      //   console.log("Fetching user profile...");
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isAuthenticated, username, email, isLoading, photo, role]);

  useEffect(() => {
    if (username && email) {
      //   console.log("Updating form data with user:", { username, email, photo });
      setFormData({
        username: username || "",
        email: email || "",
        photo: photo || "",
      });
    }
  }, [username, email, photo]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await dispatch(
        updateUserAsync({ userData: formData })
      ).unwrap();
      dispatch(updateUserProfile(updatedUser));
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to update profile");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!username || !email) {
    return <div>Loading user profile...</div>;
  }

  return (
    <div className="container mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">User Profile</h1>
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
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="photo"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Photo URL
            </label>
            <input
              type="text"
              id="photo"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              <FaSave className="mr-2" /> Save
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
              <FaUser className="mr-3 text-blue-500" />{" "}
              <strong>Username:</strong> {username}
            </p>
            <p className="flex items-center text-gray-700">
              <FaEnvelope className="mr-3 text-blue-500" />{" "}
              <strong>Email:</strong> {email}
            </p>
            <p className="flex items-center text-gray-700">
              <FaUserTag className="mr-3 text-blue-500" />{" "}
              <strong>Role:</strong> {role}
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
