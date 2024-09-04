import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = ({ username }) => {
  const [usersCount, setUsersCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [itemsCount, setItemsCount] = useState(0);
  const [outOfStockCount, setOutOfStockCount] = useState(0);
  const [recentItems, setRecentItems] = useState([]);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    // Fetch counts from backend
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
        setOutOfStockCount(
          itemsResponse.data.filter((item) => item.quantity === 0).length
        );
        setRecentItems(itemsResponse.data.slice(0, 5)); // Get the 5 most recent items
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
        <div className="bg-blue-500 p-6 rounded shadow-md text-white">
          <h3 className="text-lg font-bold">Items</h3>
          <p className="text-2xl">{itemsCount}</p>
        </div>
        <div className="bg-green-500 p-6 rounded shadow-md text-white">
          <h3 className="text-lg font-bold">Category</h3>
          <p className="text-2xl">{categoriesCount}</p>
        </div>
        <div className="bg-yellow-500 p-6 rounded shadow-md text-white">
          <h3 className="text-lg font-bold">System Users</h3>
          <p className="text-2xl">{usersCount}</p>
        </div>
        <div className="bg-red-500 p-6 rounded shadow-md text-white">
          <h3 className="text-lg font-bold">Out of Stock</h3>
          <p className="text-2xl">{outOfStockCount}</p>
        </div>
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
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Link
          to="/items/add"
          className="bg-blue-500 text-white p-4 rounded shadow-md text-center"
        >
          Add New Item
        </Link>
        <Link
          to="/categories/add"
          className="bg-green-500 text-white p-4 rounded shadow-md text-center"
        >
          Add New Category
        </Link>
        <Link
          to="/reports"
          className="bg-purple-500 text-white p-4 rounded shadow-md text-center"
        >
          Generate Report
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
