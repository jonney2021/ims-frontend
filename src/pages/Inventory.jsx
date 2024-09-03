const Inventory = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        Inventory Management
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Track and manage your inventory of components such as screws, nuts, and
        other test switch parts.
      </p>

      {/* Placeholder for future inventory table and forms */}
      <div className="bg-white shadow-md rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Inventory Items</h2>
        <p className="text-gray-500">Inventory items will be displayed here.</p>
        {/* Future table and add/edit item forms will go here */}
      </div>
    </div>
  );
};

export default Inventory;
