import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getUserByIdAsync,
  selectCurrentUser,
  selectIsLoading,
  updateUserAsync,
} from "../redux/features/user/userSlice";
import { useEffect, useState } from "react";
import UserForm from "../components/UserForm";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const EditUser = () => {
  const { id } = useParams(); // Change this from username to id
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(selectIsLoading);
  const userEdit = useSelector(selectCurrentUser);

  const [user, setUser] = useState(userEdit);
  const [userPhoto, setUserPhoto] = useState("");
  const [userPhotoPreview, setUserPhotoPreview] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await dispatch(getUserByIdAsync(id)).unwrap();
      } catch (error) {
        console.error("Failed to fetch user:", error);
        toast.error(
          "Failed to fetch user. They may not exist or have been deleted."
        );
        navigate("/users"); // Redirect to users list
      }
    };

    if (id) {
      fetchUser();
    }
  }, [dispatch, id, navigate]);

  useEffect(() => {
    if (userEdit) {
      setUser(userEdit);
      setUserPhotoPreview(userEdit.photo || "");
    }
  }, [userEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setUserPhoto(file);
    setUserPhotoPreview(URL.createObjectURL(file));
  };

  const updateUser = async (e) => {
    e.preventDefault();
    if (!user) return;
    const formData = new FormData();

    // Append user data to formData
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("role", user.role);

    if (userPhoto) {
      formData.append("photo", userPhoto);
    }

    try {
      await dispatch(
        updateUserAsync({ id: user._id, userData: formData })
      ).unwrap();

      // Refetch the user to get the updated data
      await dispatch(getUserByIdAsync(id)).unwrap();

      // toast.success("User updated successfully");
      navigate("/users");
    } catch (error) {
      console.error("Failed to update user:", error);
      toast.error("Failed to update user. Please try again.");
    }
  };

  if (!user) {
    return <div>Loading user...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {isLoading && <Loader />}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Edit User
      </h1>

      <UserForm
        user={user}
        photoPreview={userPhotoPreview}
        handleInputChange={handleInputChange}
        handlePhotoChange={handlePhotoChange}
        saveUser={updateUser}
      />
    </div>
  );
};

export default EditUser;
