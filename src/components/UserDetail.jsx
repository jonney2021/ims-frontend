import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserByIdAsync,
  selectIsLoading,
  selectCurrentUser,
} from "../redux/features/user/userSlice";
import Loader from "./Loader";

const UserDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getUserByIdAsync(id));
  }, [dispatch, id]);

  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{user.username}</h2>

      <img
        src={user.photo}
        alt={user.username}
        className="w-32 h-32 object-cover rounded-full mb-4"
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Email:</p>
          <p>{user.email}</p>
        </div>
        <div>
          <p className="font-semibold">Role:</p>
          <p>{user.role}</p>
        </div>
        <div>
          <p className="font-semibold">Created At:</p>
          <p>{new Date(user.createdAt).toLocaleString()}</p>
        </div>
        <div>
          <p className="font-semibold">Last Login:</p>
          <p>
            {user.lastLogin
              ? new Date(user.lastLogin).toLocaleString()
              : "Never"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
