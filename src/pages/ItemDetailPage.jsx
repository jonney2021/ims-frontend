import { useNavigate } from "react-router-dom";
import ItemDetail from "../components/ItemDetail";

const ItemDetailPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
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
      <h1 className="text-3xl font-bold mb-6">Item Detail</h1>
      <ItemDetail />
    </div>
  );
};

export default ItemDetailPage;
