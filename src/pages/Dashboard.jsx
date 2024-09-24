import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaBox,
  FaLayerGroup,
  FaUsers,
  FaExclamationTriangle,
  FaPlus,
} from "react-icons/fa";
import { format, parseISO } from "date-fns";

const DashboardCard = ({ title, count, icon, color, link }) => (
  <Link to={link} className="block">
    <div
      className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${color} hover:shadow-lg transition-shadow`}
    >
      <div className="flex items-center">
        <div
          className={`p-3 rounded-full ${color.replace(
            "border-",
            "bg-"
          )} bg-opacity-10 mr-4`}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-600 uppercase">{title}</p>
          <p className="text-2xl font-semibold text-gray-700">{count}</p>
        </div>
      </div>
    </div>
  </Link>
);

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
          headers: { "Content-Type": "application/json" },
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
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Items"
          count={itemsCount}
          icon={<FaBox className="h-6 w-6" />}
          color="border-blue-500"
          link="/items"
        />
        <DashboardCard
          title="Categories"
          count={categoriesCount}
          icon={<FaLayerGroup className="h-6 w-6" />}
          color="border-green-500"
          link="/categories"
        />
        <DashboardCard
          title="System Users"
          count={usersCount}
          icon={<FaUsers className="h-6 w-6" />}
          color="border-yellow-500"
          link="/users"
        />
        <DashboardCard
          title="Low Stock"
          count={lowStockCount}
          icon={<FaExclamationTriangle className="h-6 w-6" />}
          color="border-red-500"
          link="/items/low-stock"
        />
      </div>

      {/* Recent Items */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Items
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Name
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Category
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Quantity
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentItems.map((item) => (
                <tr key={item._id} className="bg-white">
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {item.name}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {item.category?.name || "N/A"}
                  </td>
                  <td
                    className={`p-3 text-sm whitespace-nowrap ${
                      item.quantity <= item.reorderLevel
                        ? "font-bold text-red-600"
                        : "text-gray-700"
                    }`}
                  >
                    {item.quantity}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {item.lastUpdated
                      ? format(parseISO(item.lastUpdated), "MMM d, yyyy HH:mm")
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      {isAdmin && (
        <div className="grid gap-4 md:grid-cols-3">
          <Link
            to="/items/add-item"
            className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg shadow-md text-center flex items-center justify-center transition-colors"
          >
            <FaPlus className="mr-2" /> Add New Item
          </Link>
          <Link
            to="/categories/add-category"
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg shadow-md text-center flex items-center justify-center transition-colors"
          >
            <FaPlus className="mr-2" /> Add New Category
          </Link>
          <Link
            to="/users/add-user"
            className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg shadow-md text-center flex items-center justify-center transition-colors"
          >
            <FaPlus className="mr-2" /> Add New User
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
