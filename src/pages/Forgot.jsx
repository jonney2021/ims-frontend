import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Ensure this is set in your .env file

  const handleForgot = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess("");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/users/forgotpassword`,
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      setSuccess(response.data.message);
      setEmail(""); // Reset email input after success
    } catch (err) {
      // Handle error from the backend or network issues
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Something went wrong.");
      } else {
        setError("Error connecting to the server.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <FaLock size={40} className="text-blue-500 mb-2" />{" "}
          <h2 className="text-2xl font-bold text-center text-blue-500">
            Forgot Password
          </h2>
        </div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mb-4">{success}</p>
        )}
        <form onSubmit={handleForgot}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Get Reset Email
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/" className="text-blue-500 hover:underline">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
