import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MdPassword } from "react-icons/md";
import { toast } from "react-toastify";
import { resetPassword } from "../services/authService";

const Reset = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const { resetToken } = useParams();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!password || !confirmPassword) {
      setError("All fields are required.");
      toast.error("All fields are required.");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      toast.error("Password must be at least 6 characters long.");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      toast.error("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    try {
      const response = await resetPassword(
        password,
        confirmPassword,
        resetToken
      );
      setSuccess(response.message);
      toast.success(response.message);
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => navigate("/login"), 3000); // Redirect to login page after 3 seconds
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <MdPassword size={40} className="text-blue-500 mb-2" />
          <h2 className="text-2xl font-bold text-center text-blue-500">
            Reset Password
          </h2>
        </div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mb-4">{success}</p>
        )}
        <form onSubmit={handleReset}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              New Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 mb-2"
              htmlFor="confirmPassword"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Reset Password
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-500 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Reset;
