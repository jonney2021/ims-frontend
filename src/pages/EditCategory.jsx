import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCategoryByIdAsync,
  selectCurrentCategory,
  selectIsLoading,
  updateCategoryAsync,
} from "../redux/features/category/categorySlice";
import { useEffect, useState } from "react";
import CategoryForm from "../components/CategoryForm";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const EditCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(selectIsLoading);
  const categoryEdit = useSelector(selectCurrentCategory);

  const [category, setCategory] = useState(categoryEdit);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        await dispatch(getCategoryByIdAsync(id)).unwrap();
      } catch (error) {
        console.error("Failed to fetch category:", error);
        toast.error(
          "Failed to fetch category. It may not exist or has been deleted."
        );
        navigate("/categories"); // Redirect to categories list
      }
    };

    fetchCategory();
  }, [dispatch, id, navigate]);

  useEffect(() => {
    if (categoryEdit) {
      setCategory(categoryEdit);
    }
  }, [categoryEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const resetForm = () => {
    if (categoryEdit) {
      setCategory(categoryEdit);
    }
  };

  const updateCategory = async (e) => {
    e.preventDefault();
    if (!category) return;

    try {
      await dispatch(
        updateCategoryAsync({ id: category._id, categoryData: category })
      ).unwrap();
      // Refetch the category to get the updated data
      await dispatch(getCategoryByIdAsync(id)).unwrap();
      resetForm();
      navigate("/categories");
    } catch (error) {
      console.error("Failed to update category:", error);
      toast.error("Failed to update category. Please try again.");
    }
  };

  if (!category) {
    return <div>Loading category...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-500 hover:text-blue-700 flex items-center"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
        Back to Categories
      </button>

      {isLoading && <Loader />}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Edit Category
      </h1>

      <CategoryForm
        category={category}
        handleInputChange={handleInputChange}
        saveCategory={updateCategory}
        handleCancel={() => navigate("/categories")}
      />
    </div>
  );
};

export default EditCategory;
