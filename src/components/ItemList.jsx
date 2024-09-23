import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemAsync,
  getItemsAsync,
  selectAllItems,
  selectIsLoading,
} from "../redux/features/item/itemSlice";
import {
  selectSearchTerm,
  selectFilteredItems,
  FILTER_ITEMS,
} from "../redux/features/item/filterSlice";
import ReactPaginate from "react-paginate";
import Loader from "./Loader";
import Search from "./Search";
import { FaEye, FaEdit, FaTrash, FaSort } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router-dom";
import { format, isValid } from "date-fns";

const ItemList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectAllItems);
  const filteredItems = useSelector(selectFilteredItems);
  const isLoading = useSelector(selectIsLoading);
  const searchTerm = useSelector(selectSearchTerm);
  const userRole = useSelector((state) => state.auth.role); // Get user role from auth state
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const isAdmin = userRole === "Admin"; // Check if user is admin

  useEffect(() => {
    dispatch(getItemsAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(FILTER_ITEMS({ items, searchTerm }));
  }, [items, searchTerm, dispatch]);

  // Sorting
  const sortedItems = useMemo(() => {
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
  const pageCount = Math.ceil(sortedItems.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = sortedItems.slice(offset, offset + itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const delItem = async (id) => {
    if (!isAdmin) {
      alert("You don't have permission to delete items.");
      return;
    }
    console.log("Deleting item with id: ", id);
    await dispatch(deleteItemAsync(id));
    // Refetch items
    await dispatch(getItemsAsync());
  };

  const confirmDelete = (id, name) => {
    if (!isAdmin) {
      alert("You don't have permission to delete items.");
      return;
    }
    confirmAlert({
      title: "Confirm to delete",
      message: `Are you sure you want to delete the item ${name}?`,
      buttons: [
        {
          label: "Delete",
          onClick: () => delItem(id),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  const handleViewItem = (itemCode) => {
    navigate(`/item-detail/${itemCode}`);
  };

  const handleEditItem = (id) => {
    navigate(`/edit-item/${id}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full">
      <Search placeholder="Search items..." />
      {sortedItems.length === 0 ? (
        <div className="text-center py-4 text-gray-500">No product found.</div>
      ) : (
        <>
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-800 text-white uppercase text-xs sm:text-sm leading-normal">
                  {[
                    "name",
                    "itemCode",
                    "quantity",
                    "reorderLevel",
                    "category",
                  ].map((key) => (
                    <th
                      key={key}
                      className="py-2 px-3 sm:py-3 sm:px-6 text-left cursor-pointer hover:bg-gray-700"
                      onClick={() => requestSort(key)}
                    >
                      {/* {key.charAt(0).toUpperCase() + key.slice(1)} */}
                      {key === "reorderLevel"
                        ? "Reorder Level"
                        : key.charAt(0).toUpperCase() + key.slice(1)}
                      <FaSort className="inline ml-1" />
                    </th>
                  ))}
                  <th className="py-2 px-3 sm:py-3 sm:px-6 text-center">
                    Actions
                  </th>
                  <th className="py-2 px-3 sm:py-3 sm:px-6 text-left cursor-pointer hover:bg-gray-700">
                    Low Stock Email
                  </th>
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
                    <td
                      className={`py-2 px-3 sm:py-3 sm:px-6 text-left ${
                        item.quantity <= item.reorderLevel
                          ? "font-bold text-red-500"
                          : ""
                      }`}
                    >
                      {item.quantity}
                    </td>
                    <td className="py-2 px-3 sm:py-3 sm:px-6 text-left">
                      {item.reorderLevel}
                    </td>
                    <td className="py-2 px-3 sm:py-3 sm:px-6 text-left">
                      {item.category.name}
                    </td>
                    <td className="py-2 px-3 sm:py-3 sm:px-6 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button className="w-5 h-5 transform hover:scale-110 text-blue-500 hover:text-blue-700">
                          <FaEye
                            size={16}
                            onClick={() => handleViewItem(item.itemCode)}
                          />
                        </button>
                        {isAdmin && (
                          <button className="w-5 h-5 transform hover:scale-110 text-green-500 hover:text-green-700">
                            <FaEdit
                              size={16}
                              onClick={() => handleEditItem(item._id)}
                            />
                          </button>
                        )}

                        {isAdmin && (
                          <button className="w-5 h-5 transform hover:scale-110 text-red-500 hover:text-red-700">
                            <FaTrash
                              size={16}
                              onClick={() => confirmDelete(item._id, item.name)}
                            />
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="py-2 px-3 sm:py-3 sm:px-6 text-left">
                      {item.lowStockEmailSent ? (
                        <span className="text-yellow-500">
                          {item.lowStockEmailSentDate &&
                          isValid(new Date(item.lowStockEmailSentDate))
                            ? `Sent on ${format(
                                new Date(item.lowStockEmailSentDate),
                                "MMM dd, yyyy HH:mm:ss"
                              )}`
                            : "Sent (date unknown)"}
                        </span>
                      ) : (
                        <span className="text-green-500">Not needed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            previousLabel="< Previous"
            renderOnZeroPageCount={null}
            containerClassName="flex justify-center mt-4 space-x-2"
            pageClassName="px-3 py-2 rounded-lg bg-gray-200 text-gray-700 cursor-pointer hover:bg-gray-300"
            activeClassName="bg-gray-800 text-white"
            previousClassName="px-3 py-2 rounded-lg bg-gray-200 text-gray-700 cursor-pointer hover:bg-gray-300"
            nextClassName="px-3 py-2 rounded-lg bg-gray-200 text-gray-700 cursor-pointer hover:bg-gray-300"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        </>
      )}
    </div>
  );
};

export default ItemList;
