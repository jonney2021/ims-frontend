import UserList from "../components/UserList";

const UserListPage = () => {
  return (
    <div className="flex-grow bg-gray-100 overflow-x-hidden">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">
          User Management
        </h1>
        <UserList />
      </div>
    </div>
  );
};

export default UserListPage;
