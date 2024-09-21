import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getItemByIdAsync,
  // getItemsAsync,
  selectCurrentItem,
  selectIsLoading,
  updateItemAsync,
} from "../redux/features/item/itemSlice";
import { useEffect, useState } from "react";
import { getCategoriesAsync } from "../redux/features/category/categorySlice";
import ItemForm from "../components/ItemForm";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const EditItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(selectIsLoading);

  const itemEdit = useSelector(selectCurrentItem);

  const { categories } = useSelector((state) => state.category);

  const [item, setItem] = useState(itemEdit);
  const [itemPhoto, setItemPhoto] = useState("");
  const [itemPhotoPreview, setItemPhotoPreview] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        await dispatch(getItemByIdAsync(id)).unwrap();
        dispatch(getCategoriesAsync());
      } catch (error) {
        console.error("Failed to fetch item:", error);
        toast.error(
          "Failed to fetch item. It may not exist or has been deleted."
        );
        navigate("/items"); // Redirect to items list
      }
    };

    fetchItem();
  }, [dispatch, id, navigate]);

  useEffect(() => {
    if (itemEdit) {
      setItem({
        ...itemEdit,
        category: itemEdit.category?._id || "",
      });
      setDescription(itemEdit.description || "");
      setItemPhotoPreview(itemEdit.photo || "");
    }
  }, [itemEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setItemPhoto(file);
    setItemPhotoPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    if (itemEdit) {
      setItem({
        ...itemEdit,
        category: itemEdit.category?._id || "",
      });
      setDescription(itemEdit.description || "");
      setItemPhoto("");
      setItemPhotoPreview(itemEdit.photo || "");
    }
  };

  const updateItem = async (e) => {
    e.preventDefault();
    if (!item) return;
    const formData = new FormData();
    // for (const key in item) {
    //   formData.append(key, item[key]);
    // }
    // formData.append("description", description);

    // Append all item properties except description
    for (const key in item) {
      if (key !== "description") {
        formData.append(key, item[key]);
      }
    }

    // Handle description separately
    formData.append("description", description || "");
    if (itemPhoto) {
      formData.append("photo", itemPhoto); // Append the new photo if selected
    }

    try {
      await dispatch(
        updateItemAsync({ itemId: id, itemData: formData })
      ).unwrap();
      // Refetch the item to get the updated data
      await dispatch(getItemByIdAsync(id)).unwrap();
      resetForm();
      navigate("/items");
    } catch (error) {
      console.error("Failed to update item:", error);
      toast.error("Failed to update item. Please try again.");
    }
  };

  if (!item) {
    return <div>Loading item...</div>;
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
        Back to Items
      </button>

      {isLoading && <Loader />}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Edit Item
      </h1>

      <ItemForm
        item={item}
        itemPhotoPreview={itemPhotoPreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handlePhotoChange={handlePhotoChange}
        saveItem={updateItem}
        categories={categories}
      />
    </div>
  );
};
export default EditItem;
