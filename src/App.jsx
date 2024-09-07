import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import Login from "./components/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true" // Check from local storage
  );
  const [username, setUsername] = useState(
    localStorage.getItem("username") || "User"
  );

  useEffect(() => {
    // Save authentication status to local storage
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem("username", username);
  }, [username]);

  return (
    <Router>
      <div className="flex min-h-screen">
        {isAuthenticated && <Sidebar />}
        <div className="flex flex-col flex-1">
          {isAuthenticated && (
            <Header
              username={username}
              setIsAuthenticated={setIsAuthenticated}
              setUsername={setUsername}
            />
          )}
          <main className="flex-1 p-4 lg:ml-0">
            <Routes>
              {/* Redirect to /login if not authenticated */}
              <Route
                path="/"
                element={
                  isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/login"
                element={
                  <Login
                    setIsAuthenticated={setIsAuthenticated}
                    setUsername={setUsername}
                  />
                }
              />
            </Routes>
          </main>
          {isAuthenticated && <Footer className="hidden lg:block" />}
        </div>
      </div>
    </Router>
  );
}

export default App;
