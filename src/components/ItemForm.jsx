// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ItemForm = ({
  item = {},
  // item,
  //   itemPhoto,
  itemPhotoPreview,
  description,
  setDescription,
  handleInputChange,
  handlePhotoChange,
  saveItem,
  categories,
}) => {
  const {
    name = "",
    category = "",
    itemCode = "",
    quantity = "",
    reorderLevel = "",
  } = item || {};
  // const { name, category, itemCode, quantity, reorderLevel } = item;

  return (
    <form
      onSubmit={saveItem}
      className="max-w-2xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Item Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Item Name"
          name="name"
          value={name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="category"
        >
          Category
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="category"
          name="category"
          // value={category}
          value={category}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Category</option>
          {categories &&
            categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
        </select>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="itemCode"
        >
          Item Code
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="itemCode"
          type="text"
          placeholder="Item Code"
          name="itemCode"
          value={itemCode}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-4 flex justify-between">
        <div className="w-1/2 mr-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="quantity"
          >
            Quantity
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="quantity"
            type="number"
            placeholder="Quantity"
            name="quantity"
            value={quantity}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="w-1/2 ml-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="reorderLevel"
          >
            Reorder Level
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="reorderLevel"
            type="number"
            placeholder="Reorder Level"
            name="reorderLevel"
            value={reorderLevel}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        {/* <ReactQuill
          theme="snow"
          value={description}
          onChange={setDescription}
          placeholder="Item description"
          className="bg-white"
        /> */}
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          name="description"
          rows="4"
          placeholder="Item description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="photo"
        >
          Item Photo
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="photo"
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
        />
      </div>
      {itemPhotoPreview && (
        <div className="mb-4">
          <img
            src={itemPhotoPreview}
            alt="preview"
            className="max-w-xs mx-auto"
          />
        </div>
      )}
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Save Item
        </button>
      </div>
    </form>
  );
};

export default ItemForm;
