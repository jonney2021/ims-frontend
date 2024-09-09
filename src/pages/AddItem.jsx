import { useState } from "react";
import ItemForm from "../components/ItemForm";
import { useSelector, useDispatch } from "react-redux";
import {
  createItemAsync,
  selectIsLoading,
} from "../redux/features/item/itemSlice";
// import { fetchCategories } from "../redux/features/category/categorySlice";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

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
  //   const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(selectIsLoading);

  //   useEffect(() => {
  //     const loadCategories = async () => {
  //       try {
  //         const result = await dispatch(fetchCategories()).unwrap();
  //         setCategories(result);
  //       } catch (error) {
  //         console.error("Failed to fetch categories:", error);
  //       }
  //     };
  //     loadCategories();
  //   }, [dispatch]);

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
    <div>
      {isLoading && <Loader />}
      <h1>Add Item</h1>
      <ItemForm
        item={item}
        // itemPhoto={itemPhoto}
        itemPhotoPreview={itemPhotoPreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handlePhotoChange={handlePhotoChange}
        saveItem={saveItem}
        // categories={categories}
      />
    </div>
  );
};

export default AddItem;
