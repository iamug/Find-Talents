import React from "react";
import { TopNav } from ".";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Layout: React.FC = ({ children }) => {
  return (
    <div className=" g-0 px-0">
      <TopNav />
      <main role="main" className="">
        <div className="bg-white">
          <div className="container">
            <ToastContainer limit={1} position="top-center" autoClose={3000} />
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
