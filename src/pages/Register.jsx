import { useState } from "react";
import UserForm from "../components/UserForm";
import { useSelector, useDispatch } from "react-redux";
import {
  registerUserAsync,
  selectIsLoading,
} from "../redux/features/user/userSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const initialState = {
  username: "",
  email: "",
  password: "",
  role: "User",
};

const Register = () => {
  const [user, setUser] = useState(initialState);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(selectIsLoading);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setUser(initialState);
    setPhoto(null);
    setPhotoPreview(null);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("role", user.role);
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      await dispatch(registerUserAsync(formData)).unwrap();
      resetForm();
      navigate("/users");
    } catch (error) {
      console.error("Failed to register user:", error);
      toast.error(error || "Failed to register user");
    }
  };

  const handleCancel = () => {
    navigate("/users");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {isLoading && <Loader />}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Register User
      </h1>
      <UserForm
        user={user}
        handleInputChange={handleInputChange}
        handlePhotoChange={handlePhotoChange}
        saveUser={saveUser}
        handleCancel={handleCancel}
        photoPreview={photoPreview}
      />
    </div>
  );
};

export default Register;
