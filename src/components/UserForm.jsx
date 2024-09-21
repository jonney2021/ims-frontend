const UserForm = ({
  user = {},
  handleInputChange,
  handlePhotoChange,
  saveUser,
  photoPreview,
}) => {
  const { username = "", email = "", role = "User" } = user || {};

  const isEditing = !!user._id;

  return (
    <form
      onSubmit={saveUser}
      className="max-w-2xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={handleInputChange}
          required
          minLength={3}
          maxLength={20}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleInputChange}
          required
        />
      </div>
      {!isEditing && (
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleInputChange}
            required
            minLength={6}
          />
        </div>
      )}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="role"
        >
          Role
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="role"
          name="role"
          value={role}
          onChange={handleInputChange}
          required
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="photo"
        >
          Profile Photo
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="photo"
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
        />
      </div>
      {photoPreview && (
        <div className="mb-4">
          <img
            src={photoPreview}
            alt="preview"
            className="max-w-xs mx-auto rounded-full"
          />
        </div>
      )}
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {isEditing ? "Update User" : "Register User"}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
