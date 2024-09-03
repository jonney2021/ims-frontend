// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";

function App() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Handle screen resize to determine whether it's a small screen
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Router>
      {/* Main Container with adjusted layout */}
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <main className="flex-1 p-4 lg:ml-0">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              {/* <Route path="/categories" element={<Category />} />
              <Route path="/items" element={<Items />} />
              <Route path="/users" element={<Users />} /> */}
            </Routes>
          </main>

          {/* Footer hidden when sidebar is in hamburger mode */}
          {!isSmallScreen && <Footer />}
        </div>
      </div>
    </Router>
  );
}

export default App;
