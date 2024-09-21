import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserAsync,
  getAllUsersAsync,
  selectAllUsers,
  selectIsLoading,
} from "../redux/features/user/userSlice";
import { selectSearchTerm } from "../redux/features/item/filterSlice";
import ReactPaginate from "react-paginate";
import Loader from "./Loader";
import Search from "./Search";
import { FaEye, FaEdit, FaTrash, FaSort } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(selectAllUsers);
  const isLoading = useSelector(selectIsLoading);
  const searchTerm = useSelector(selectSearchTerm);
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  useEffect(() => {
    dispatch(getAllUsersAsync());
  }, [dispatch]);

  // Sorting and Filtering
  const sortedAndFilteredUsers = useMemo(() => {
    let filteredUsers = users.filter((user) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        user.username.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.role.toLowerCase().includes(searchLower)
      );
    });

    if (sortConfig.key !== null) {
      filteredUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return filteredUsers;
  }, [users, searchTerm, sortConfig]);

  // Pagination
  const pageCount = Math.ceil(sortedAndFilteredUsers.length / usersPerPage);
  const offset = currentPage * usersPerPage;
  const currentUsers = sortedAndFilteredUsers.slice(
    offset,
    offset + usersPerPage
  );

  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm]);

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

  const delUser = async (id) => {
    await dispatch(deleteUserAsync(id));
    dispatch(getAllUsersAsync());
  };

  const confirmDelete = (id, username) => {
    confirmAlert({
      title: "Confirm to delete",
      message: `Are you sure you want to delete the user ${username}?`,
      buttons: [
        {
          label: "Delete",
          onClick: () => delUser(id),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  const handleViewUser = (id) => {
    navigate(`/user-detail/${id}`);
  };

  // const handleEditUser = (id) => {
  //   navigate(`/edit-user/${id}`);
  // };

  const handleEditUser = (id) => {
    navigate(`/edit-user/${id}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full">
      <Search placeholder="Search users..." />
      {sortedAndFilteredUsers.length === 0 ? (
        <div className="text-center py-4 text-gray-500">No users found.</div>
      ) : (
        <>
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-800 text-white uppercase text-xs sm:text-sm leading-normal">
                  {["username", "email", "role"].map((key) => (
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
                {currentUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-2 px-3 sm:py-3 sm:px-6 text-left whitespace-nowrap">
                      {user.username}
                    </td>
                    <td className="py-2 px-3 sm:py-3 sm:px-6 text-left">
                      {user.email}
                    </td>
                    <td className="py-2 px-3 sm:py-3 sm:px-6 text-left">
                      {user.role}
                    </td>
                    <td className="py-2 px-3 sm:py-3 sm:px-6 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button className="w-5 h-5 transform hover:scale-110 text-blue-500 hover:text-blue-700">
                          <FaEye
                            size={16}
                            onClick={() => handleViewUser(user._id)}
                          />
                        </button>
                        <button className="w-5 h-5 transform hover:scale-110 text-green-500 hover:text-green-700">
                          <FaEdit
                            size={16}
                            // onClick={() => handleEditUser(user._id)}
                            onClick={() => handleEditUser(user._id)}
                          />
                        </button>
                        <button className="w-5 h-5 transform hover:scale-110 text-red-500 hover:text-red-700">
                          <FaTrash
                            size={16}
                            onClick={() =>
                              confirmDelete(user._id, user.username)
                            }
                          />
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

export default UserList;
