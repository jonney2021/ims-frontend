import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Inventory Management System
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/inventory" className="text-white hover:text-gray-300">
              Inventory
            </Link>
          </li>
          <li>
            <Link to="/reports" className="text-white hover:text-gray-300">
              Reports
            </Link>
          </li>
          <li>
            <Link to="/users" className="text-white hover:text-gray-300">
              Users
            </Link>
          </li>
          <li>
            <Link to="/profile" className="text-white hover:text-gray-300">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/login" className="text-white hover:text-gray-300">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
