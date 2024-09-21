import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategoryAsync,
  getCategoriesAsync,
  selectAllCategories,
  selectIsLoading,
} from "../redux/features/category/categorySlice";
import ReactPaginate from "react-paginate";
import Loader from "./Loader";
import Search from "./Search";
import { FaEye, FaEdit, FaTrash, FaSort } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router-dom";
import { selectSearchTerm } from "../redux/features/item/filterSlice";

const CategoryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector(selectAllCategories);
  const isLoading = useSelector(selectIsLoading);
  const searchTerm = useSelector(selectSearchTerm);
  const userRole = useSelector((state) => state.auth.role); // Get user role from auth state
  const [currentPage, setCurrentPage] = useState(0);
  const [categoriesPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const isAdmin = userRole === "Admin"; // Check if user is admin

  useEffect(() => {
    dispatch(getCategoriesAsync());
  }, [dispatch]);

  // Sorting
  const sortedCategories = useMemo(() => {
    let sortableCategories = [...categories];
    if (sortConfig.key !== null) {
      sortableCategories.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableCategories;
  }, [categories, sortConfig]);

  // Filtering
  const filteredCategories = useMemo(() => {
    return sortedCategories.filter((category) => {
      const nameMatch = category.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const descriptionMatch =
        category.description &&
        category.description.toLowerCase().includes(searchTerm.toLowerCase());
      return nameMatch || descriptionMatch;
    });
  }, [sortedCategories, searchTerm]);

  // Pagination
  const pageCount = Math.ceil(filteredCategories.length / categoriesPerPage);
  const offset = currentPage * categoriesPerPage;
  const currentCategories = filteredCategories.slice(
    offset,
    offset + categoriesPerPage
  );

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

  const delCategory = async (id) => {
    if (!isAdmin) {
      alert("You don't have permission to delete categories.");
      return;
    }
    console.log("Deleting category with id: ", id);
    await dispatch(deleteCategoryAsync(id));
    dispatch(getCategoriesAsync());
  };

  const confirmDelete = (id, name) => {
    if (!isAdmin) {
      alert("You don't have permission to delete categories.");
      return;
    }
    confirmAlert({
      title: "Confirm to delete",
      message: `Are you sure you want to delete the category ${name}?`,
      buttons: [
        {
          label: "Delete",
          onClick: () => delCategory(id),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  const handleViewCategory = (id) => {
    navigate(`/category-detail/${id}`);
  };

  const handleEditCategory = (id) => {
    navigate(`/edit-category/${id}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full">
      <Search placeholder="Search categories..." />
      {filteredCategories.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          No categories found.
        </div>
      ) : (
        <>
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-800 text-white uppercase text-xs sm:text-sm leading-normal">
                  {["name", "description"].map((key) => (
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
                {currentCategories.map((category) => (
                  <tr
                    key={category._id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-2 px-3 sm:py-3 sm:px-6 text-left whitespace-nowrap">
                      {category.name}
                    </td>
                    <td className="py-2 px-3 sm:py-3 sm:px-6 text-left">
                      {category.description}
                    </td>
                    <td className="py-2 px-3 sm:py-3 sm:px-6 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button className="w-5 h-5 transform hover:scale-110 text-blue-500 hover:text-blue-700">
                          <FaEye
                            size={16}
                            onClick={() => handleViewCategory(category._id)}
                          />
                        </button>
                        {isAdmin && (
                          <button className="w-5 h-5 transform hover:scale-110 text-green-500 hover:text-green-700">
                            <FaEdit
                              size={16}
                              onClick={() => handleEditCategory(category._id)}
                            />
                          </button>
                        )}

                        {isAdmin && (
                          <button className="w-5 h-5 transform hover:scale-110 text-red-500 hover:text-red-700">
                            <FaTrash
                              size={16}
                              onClick={() =>
                                confirmDelete(category._id, category.name)
                              }
                            />
                          </button>
                        )}
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

export default CategoryList;
