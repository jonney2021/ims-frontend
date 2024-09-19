import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryByIdAsync,
  selectIsLoading,
  selectCurrentCategory,
} from "../redux/features/category/categorySlice";
import Loader from "./Loader";

const CategoryDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const category = useSelector(selectCurrentCategory);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getCategoryByIdAsync(id));
  }, [dispatch, id]);

  if (isLoading) {
    return <Loader />;
  }

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
      <div className="mt-4">
        <p className="font-semibold">Description:</p>
        <p>{category.description}</p>
      </div>
    </div>
  );
};

export default CategoryDetail;
