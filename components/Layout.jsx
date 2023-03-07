import React from "react";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <div className="p-5 sm:w-10/12 max-w-5xl mx-auto">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
