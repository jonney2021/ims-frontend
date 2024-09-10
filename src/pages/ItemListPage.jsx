import ItemList from "../components/ItemList";

const ItemListPage = () => {
  return (
    <div className="flex-grow bg-gray-100 overflow-x-hidden">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">
          Inventory Items
        </h1>
        <ItemList />
      </div>
    </div>
  );
};

export default ItemListPage;
