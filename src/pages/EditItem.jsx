import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getItemAsync,
  getItemsAsync,
  selectCurrentItem,
  selectIsLoading,
  updateItemAsync,
} from "../redux/features/item/itemSlice";
import { useEffect, useState } from "react";
import { getCategoriesAsync } from "../redux/features/category/categorySlice";
import ItemForm from "../components/ItemForm";
import Loader from "../components/Loader";

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
    if (!itemEdit || itemEdit._id !== id) {
      dispatch(getItemAsync(id));
    } else {
      setItem(itemEdit);
      setDescription(itemEdit.description);
    }
  }, [dispatch, id, itemEdit]);

  useEffect(() => {
    dispatch(getCategoriesAsync());
  }, [dispatch]);

  useEffect(() => {
    setItem(itemEdit);

    if (item.photo) {
      setItemPhotoPreview(item.photo);
    } else {
      setItemPhotoPreview("");
    }

    if (item.description) {
      setDescription(item.description);
    } else {
      setDescription("");
    }
  }, [itemEdit, item]);

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
    setItem(itemEdit);
    setDescription(itemEdit.description);
    setItemPhoto("");
    setItemPhotoPreview(itemEdit.photo);
  };

  const updateItem = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in item) {
      formData.append(key, item[key]);
    }
    formData.append("description", description);
    if (itemPhoto) {
      formData.append("photo", itemPhoto); // Append the new photo if selected
    }

    try {
      await dispatch(
        updateItemAsync({ itemId: id, itemData: formData })
      ).unwrap();
      resetForm();
      // Refresh the list of items
      await dispatch(getItemsAsync());
      navigate("/");
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {isLoading && <Loader />}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Edit Item
      </h1>
      {/* {itemPhotoPreview && (
        <div className="mb-6">
          <img
            src={itemPhotoPreview}
            alt="Item Preview"
            className="w-full h-auto rounded-lg"
          />
        </div>
      )} */}
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
