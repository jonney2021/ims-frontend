// import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  // const [isAuthenticated, setIsAuthenticated] = useState(
  //   localStorage.getItem("isAuthenticated") === "true"
  // );
  // const [username, setUsername] = useState(
  //   localStorage.getItem("username") || "User"
  // );

  // useEffect(() => {
  //   localStorage.setItem("isAuthenticated", isAuthenticated);
  // }, [isAuthenticated]);

  // useEffect(() => {
  //   localStorage.setItem("username", username);
  // }, [username]);
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        {/* <Header
          username={username}
          setIsAuthenticated={setIsAuthenticated}
          setUsername={setUsername}
        /> */}
        <Header />
        <main className="flex-1 p-4 lg:ml-0">{children}</main>
        <Footer className="hidden lg:block" />
      </div>
    </div>
  );
};

export default Layout;
