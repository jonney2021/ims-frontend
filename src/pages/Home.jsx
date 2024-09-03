import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        Welcome to Inventory Management System
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Manage your inventory efficiently with real-time tracking, stock alerts,
        and comprehensive reports.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/inventory"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Manage Inventory
        </Link>
        <Link
          to="/reports"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          View Reports
        </Link>
        <Link
          to="/users"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          User Management
        </Link>
      </div>
    </div>
  );
};

export default Home;
