// Header.jsx
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = ({ username, setIsAuthenticated, setUsername }) => {
  const [dateTime, setDateTime] = useState(new Date());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Update the date and time every second
  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(`${API_BASE_URL}/api/users/logout`, {
        withCredentials: true,
      });
      // Update authentication state
      setIsAuthenticated(false);
      setUsername("");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Date and Time */}
      <div className="text-gray-600">
        {dateTime.toLocaleDateString()} {dateTime.toLocaleTimeString()}
      </div>

      {/* User Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
        >
          Welcome, <span className="font-bold">{username}</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <ul className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md">
            <li>
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
