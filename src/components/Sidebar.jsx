// Sidebar.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle Button for Smaller Screens */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden text-white bg-gray-800 p-2 rounded-full focus:outline-none"
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white h-screen fixed lg:relative z-40 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64`}
      >
        <div className="flex items-center justify-center h-16 shadow-md">
          <h1 className="text-xl font-bold">Inventory System</h1>
        </div>
        <nav className="mt-10">
          <ul>
            <li className="px-4 py-2 hover:bg-gray-700">
              <Link to="/" onClick={toggleSidebar}>
                Dashboard
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700">
              <Link to="/categories" onClick={toggleSidebar}>
                Category
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700">
              <Link to="/items" onClick={toggleSidebar}>
                Item
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700">
              <Link to="/users" onClick={toggleSidebar}>
                Users
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
