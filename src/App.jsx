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
              <Routes>
                <Route path="/" element={<Dashboard />} />
                {/* Add other authenticated routes here */}
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
