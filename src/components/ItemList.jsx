import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getItemsAsync,
  selectAllItems,
  selectIsLoading,
} from "../redux/features/item/itemSlice";
import Loader from "./Loader";
import { FaEye, FaEdit, FaTrash, FaSort } from "react-icons/fa";

const ItemList = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectAllItems);
  const isLoading = useSelector(selectIsLoading);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  useEffect(() => {
    dispatch(getItemsAsync());
  }, [dispatch]);

  // Search and filter
  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting
  const sortedItems = React.useMemo(() => {
    let sortableItems = [...filteredItems];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (sortConfig.key === "category") {
          if (a.category.name < b.category.name) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (a.category.name > b.category.name) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
        } else {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredItems, sortConfig]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search items..."
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-800 text-white uppercase text-xs sm:text-sm leading-normal">
              {["name", "item code", "quantity", "category"].map((key) => (
                <th
                  key={key}
                  className="py-2 px-3 sm:py-3 sm:px-6 text-left cursor-pointer hover:bg-gray-700"
                  onClick={() => requestSort(key)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  <FaSort className="inline ml-1" />
                </th>
              ))}
              <th className="py-2 px-3 sm:py-3 sm:px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-xs sm:text-sm font-medium">
            {currentItems.map((item) => (
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
                  {item.quantity}
                </td>
                <td className="py-2 px-3 sm:py-3 sm:px-6 text-left">
                  {item.category.name}
                </td>
                <td className="py-2 px-3 sm:py-3 sm:px-6 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button className="w-5 h-5 transform hover:scale-110 text-blue-500 hover:text-blue-700">
                      <FaEye size={16} />
                    </button>
                    <button className="w-5 h-5 transform hover:scale-110 text-green-500 hover:text-green-700">
                      <FaEdit size={16} />
                    </button>
                    <button className="w-5 h-5 transform hover:scale-110 text-red-500 hover:text-red-700">
                      <FaTrash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4 flex-wrap">
        {Array.from(
          { length: Math.ceil(sortedItems.length / itemsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-2 sm:px-3 py-1 rounded text-sm ${
                currentPage === i + 1
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ItemList;
