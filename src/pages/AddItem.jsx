import { useState, useEffect } from "react";
import ItemForm from "../components/ItemForm";
import { useSelector, useDispatch } from "react-redux";
import {
  createItemAsync,
  selectIsLoading,
} from "../redux/features/item/itemSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { getCategoriesAsync } from "../redux/features/category/categorySlice";

const initialState = {
  name: "",
  category: "",
  itemCode: "",
  quantity: 0,
  reorderLevel: 10,
};

const AddItem = () => {
  const [item, setItem] = useState(initialState);
  const [itemPhoto, setItemPhoto] = useState("");
  const [itemPhotoPreview, setItemPhotoPreview] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(selectIsLoading);

  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategoriesAsync());
  }, [dispatch]);

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
    setItem(initialState);
    setItemPhoto("");
    setItemPhotoPreview("");
    setDescription("");
  };

  const saveItem = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in item) {
      formData.append(key, item[key]);
    }
    formData.append("description", description);
    if (itemPhoto) {
      formData.append("photo", itemPhoto);
    }

    try {
      await dispatch(createItemAsync(formData)).unwrap();
      resetForm();
      navigate("/");
    } catch (error) {
      console.error("Failed to create item:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {isLoading && <Loader />}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Add Item
      </h1>
      <ItemForm
        item={item}
        itemPhotoPreview={itemPhotoPreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handlePhotoChange={handlePhotoChange}
        saveItem={saveItem}
        categories={categories}
      />
    </div>
  );
};

export default AddItem;
