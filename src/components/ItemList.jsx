import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
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

const ItemList = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectAllItems);
  const filteredItems = useSelector(selectFilteredItems);
  const isLoading = useSelector(selectIsLoading);
  const searchTerm = useSelector(selectSearchTerm);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

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
                  {["name", "itemCode", "quantity", "category"].map((key) => (
                    <th
                      key={key}
                      className="py-2 px-3 sm:py-3 sm:px-6 text-left cursor-pointer hover:bg-gray-700"
                      onClick={() => requestSort(key)}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                      <FaSort className="inline ml-1" />
                    </th>
                  ))}
                  <th className="py-2 px-3 sm:py-3 sm:px-6 text-center">
                    Actions
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
