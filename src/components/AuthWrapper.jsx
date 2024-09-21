import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuthStatus } from "../redux/features/auth/authSlice";

const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return children;
};

export default AuthWrapper;
