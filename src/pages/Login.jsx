import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { loginUser, validateEmail } from "../services/authService";
import Loader from "../components/Loader";
import { FaUser, FaLock, FaWarehouse } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Frontend validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      toast.error("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      // Call the loginUser service
      const userData = await loginUser(email, password);
      dispatch(setCredentials(userData));
      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      // Handle errors from authService
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div
        className="hidden lg:flex w-full lg:w-2/5 login_img_section
        justify-around items-center bg-gray-800"
      >
        <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
          <h1 className="text-white font-bold text-4xl font-sans">
            Inventory Management System
          </h1>
          <p className="text-white mt-1 text-lg">
            Efficiently manage your inventory with our advanced system
          </p>
          <div className="flex justify-center lg:justify-start mt-6">
            <FaWarehouse className="text-white text-8xl" />
          </div>
        </div>
      </div>
      <div className="flex w-full lg:w-3/5 justify-center items-center bg-white">
        <div className="w-full max-w-lg px-10 py-8">
          <form
            className="bg-white rounded-xl shadow-2xl p-10"
            onSubmit={handleLogin}
          >
            <h1 className="text-gray-800 font-bold text-3xl mb-8 text-center">
              Welcome Back
            </h1>
            {error && <p className="text-red-500 text-center mb-6">{error}</p>}
            <div className="flex items-center border-2 mb-8 py-3 px-4 rounded-2xl">
              <FaUser className="text-gray-400 mr-2" />
              <input
                className="pl-2 w-full outline-none border-none text-lg"
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center border-2 mb-10 py-3 px-4 rounded-2xl">
              <FaLock className="text-gray-400 mr-2" />
              <input
                className="pl-2 w-full outline-none border-none text-lg"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="block w-full bg-blue-600 mt-5 py-3 rounded-2xl hover:bg-blue-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-4 text-lg"
              disabled={loading}
            >
              {loading ? <Loader /> : "Login"}
            </button>
            <div className="text-center mt-6">
              <Link
                to="/forgot"
                className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer transition-all duration-500"
              >
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
