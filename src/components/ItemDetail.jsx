import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getItemAsync,
  selectIsLoading,
  selectCurrentItem,
} from "../redux/features/item/itemSlice";
import Loader from "./Loader";

const ItemDetail = () => {
  const { itemcode } = useParams();
  const dispatch = useDispatch();
  const item = useSelector(selectCurrentItem);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getItemAsync(itemcode));
  }, [dispatch, itemcode]);

  if (isLoading) {
    return <Loader />;
  }

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{item.name}</h2>

      {item.photo && (
        <img
          src={item.photo}
          alt={item.name}
          className="w-64 h-64 object-cover mb-4"
        />
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Item Code:</p>
          <p>{item.itemCode}</p>
        </div>
        <div>
          <p className="font-semibold">Category:</p>
          <p>{item.category.name}</p>
        </div>
        <div>
          <p className="font-semibold">Quantity:</p>
          <p>{item.quantity}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="font-semibold">Description:</p>
        <div
          dangerouslySetInnerHTML={{ __html: item.description }}
          className="prose"
        />
      </div>
    </div>
  );
};

export default ItemDetail;
