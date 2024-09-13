import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../redux/features/item/filterSlice";

const Search = ({ placeholder = "Search..." }) => {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <div className="relative mb-4">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full p-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
        onChange={handleSearch}
      />
      <FaSearch
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={16}
      />
    </div>
  );
};

export default Search;
