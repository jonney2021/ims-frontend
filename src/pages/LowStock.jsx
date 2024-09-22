import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLowStockItemsAsync,
  selectLowStockItems,
  selectIsLoading,
} from "../redux/features/item/itemSlice";
import Loader from "../components/Loader";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LowStock = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lowStockItems = useSelector(selectLowStockItems);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getLowStockItemsAsync());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (!Array.isArray(lowStockItems)) {
    console.error("lowStockItems is not an array:", lowStockItems);
    return <p>Error: Unable to load low stock items.</p>;
  }

  const handleViewItem = (itemCode) => {
    navigate(`/item-detail/${itemCode}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Low Stock Items</h1>
      {lowStockItems.length === 0 ? (
        <p className="text-center py-4 text-gray-500">
          No low stock items found.
        </p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-800 text-white uppercase text-xs sm:text-sm leading-normal">
                <th className="py-2 px-3 sm:py-3 sm:px-6 text-left">Name</th>
                <th className="py-2 px-3 sm:py-3 sm:px-6 text-left">
                  Item Code
                </th>
                <th className="py-2 px-3 sm:py-3 sm:px-6 text-left">
                  Category
                </th>
                <th className="py-2 px-3 sm:py-3 sm:px-6 text-left">
                  Quantity
                </th>
                <th className="py-2 px-3 sm:py-3 sm:px-6 text-left">
                  Reorder Level
                </th>
                <th className="py-2 px-3 sm:py-3 sm:px-6 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-xs sm:text-sm font-medium">
              {lowStockItems.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-2 px-3 sm:py-3 sm:px-6 text-left whitespace-nowrap">
                    {item.name}
                  </td>
                  <td className="py-2 px-3 sm:py-3 sm:px-6 text-left">
                    {item.itemCode}
                  </td>
                  <td className="py-2 px-3 sm:py-3 sm:px-6 text-left">
                    {item.category?.name || "N/A"}
                  </td>
                  <td
                    className={`py-2 px-3 sm:py-3 sm:px-6 text-left font-bold ${
                      item.quantity <= item.reorderLevel ? "text-red-500" : ""
                    }`}
                  >
                    {item.quantity}
                  </td>
                  <td className="py-2 px-3 sm:py-3 sm:px-6 text-left">
                    {item.reorderLevel}
                  </td>
                  <td className="py-2 px-3 sm:py-3 sm:px-6 text-center">
                    <button
                      className="w-5 h-5 transform hover:scale-110 text-blue-500 hover:text-blue-700"
                      onClick={() => handleViewItem(item.itemCode)}
                    >
                      <FaEye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LowStock;
