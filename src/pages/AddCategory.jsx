import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CategoryForm from "../components/CategoryForm";
import {
  createCategoryAsync,
  selectIsLoading,
} from "../redux/features/category/categorySlice";
import Loader from "../components/Loader";

const initialState = {
  name: "",
  description: "",
};

const AddCategory = () => {
  const [category, setCategory] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(selectIsLoading);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const resetForm = () => {
    setCategory(initialState);
  };

  const saveCategory = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createCategoryAsync(category)).unwrap();
      resetForm();
      navigate("/categories");
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  const handleCancel = () => {
    navigate("/categories");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {isLoading && <Loader />}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Add Category
      </h1>
      <CategoryForm
        category={category}
        handleInputChange={handleInputChange}
        saveCategory={saveCategory}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default AddCategory;
