import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [itemsCount, setItemsCount] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [recentItems, setRecentItems] = useState([]);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const userRole = useSelector((state) => state.auth.role);
  const isAdmin = userRole === "Admin";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = axios.create({
          baseURL: API_BASE_URL,
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        const [usersResponse, categoriesResponse, itemsResponse] =
          await Promise.all([
            api.get("/api/users"),
            api.get("/api/categories"),
            api.get("/api/items"),
          ]);

        setUsersCount(usersResponse.data.length);
        setCategoriesCount(categoriesResponse.data.length);
        setItemsCount(itemsResponse.data.length);
        setLowStockCount(
          itemsResponse.data.filter(
            (item) => item.quantity <= item.reorderLevel
          ).length
        );
        setRecentItems(itemsResponse.data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [API_BASE_URL]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Link to="/items" className="block">
          <div className="bg-blue-500 p-6 rounded shadow-md text-white hover:bg-blue-600 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">Items</h3>
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <p className="text-2xl">{itemsCount}</p>
          </div>
        </Link>

        <Link to="/categories" className="block">
          <div className="bg-green-500 p-6 rounded shadow-md text-white hover:bg-green-600 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">Categories</h3>
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <p className="text-2xl">{categoriesCount}</p>
          </div>
        </Link>

        <Link to="/users" className="block">
          <div className="bg-yellow-500 p-6 rounded shadow-md text-white hover:bg-yellow-600 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">System Users</h3>
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <p className="text-2xl">{usersCount}</p>
          </div>
        </Link>

        <Link to="/items/low-stock" className="block">
          <div className="bg-red-500 p-6 rounded shadow-md text-white hover:bg-red-600 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">Low Stock</h3>
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <p className="text-2xl">{lowStockCount}</p>
          </div>
        </Link>
      </div>

      {/* Recent Items */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-8">
        <h2 className="text-xl font-bold mb-4">Recent Items</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="text-left">Category</th>
              <th className="text-left">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {recentItems.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.category?.name || "N/A"}</td>
                {/* <td>{item.quantity}</td> */}
                <td
                  className={
                    item.quantity <= item.reorderLevel
                      ? "font-bold text-red-600"
                      : ""
                  }
                >
                  {item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Actions */}
      {isAdmin && (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <Link
            to="/items/add-item"
            className="bg-blue-500 text-white p-4 rounded shadow-md text-center"
          >
            Add New Item
          </Link>
          <Link
            to="/categories/add-category"
            className="bg-green-500 text-white p-4 rounded shadow-md text-center"
          >
            Add New Category
          </Link>
          <Link
            to="/users/add-user"
            className="bg-purple-500 text-white p-4 rounded shadow-md text-center"
          >
            Add New User
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
