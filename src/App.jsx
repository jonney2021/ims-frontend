import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Forgot from "./pages/Forgot";
import Reset from "./pages/Reset";
import Layout from "./components/Layout";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddItem from "./pages/AddItem";
import ItemListPage from "./pages/ItemListPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import EditItem from "./pages/EditItem";
import CategoryListPage from "./pages/CategoryListPage";
import AddCategory from "./pages/AddCategory";
import CategoryDetailPage from "./pages/CategoryDetailPage";
import EditCategory from "./pages/EditCategory";
import Register from "./pages/Register";
import UserListPage from "./pages/UserListPage";
import UserDetailPage from "./pages/UserDetailPage";

axios.defaults.withCredentials = true;

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/resetpassword/:resetToken" element={<Reset />} />
        <Route
          path="/*"
          element={
            <Layout>
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/categories" element={<CategoryListPage />} />
                  <Route
                    path="/categories/add-category"
                    element={<AddCategory />}
                  />
                  <Route
                    path="/category-detail/:id"
                    element={<CategoryDetailPage />}
                  />
                  <Route path="/edit-category/:id" element={<EditCategory />} />
                  <Route path="/items/add-item" element={<AddItem />} />
                  <Route path="/items" element={<ItemListPage />} />
                  <Route
                    path="/item-detail/:itemcode"
                    element={<ItemDetailPage />}
                  />
                  <Route path="/edit-item/:id" element={<EditItem />} />
                  <Route path="/users" element={<UserListPage />} />
                  <Route path="/users/add-user" element={<Register />} />
                  <Route
                    path="/user-detail/:username"
                    element={<UserDetailPage />}
                  />
                </Routes>
              </div>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
