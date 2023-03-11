import React, { useEffect, useContext, useState } from "react";
import { ProductsContext } from "@/context/ProductsContext";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const { setSelectedProducts } = useContext(ProductsContext);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (window.location.href.includes("success")) {
      setSelectedProducts([]);
      setSuccess(true);
    }
  }, []);
  return (
    <div>
      <div className="p-5 sm:w-10/12 max-w-5xl mx-auto">
        {success && (
          <div className="mb-5 bg-green-400 text-white text-lg p-5 rounded-xl">
            Thank you for your purchase!
          </div>
        )}
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
