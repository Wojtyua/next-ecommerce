import React, { useContext } from "react";
import Image from "next/image";
import { ProductsContext } from "@/context/ProductsContext";

const Product = ({ _id, name, price, description, picture }) => {
  // context
  const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);

  function addProduct() {
    setSelectedProducts((prev) => [...prev, _id]);
  }

  return (
    <div className="w-64">
      <div className="bg-blue-100 p-5 rounded-xl mb-3">
        <img src={picture} alt={`${name} picture`} />
      </div>

      <h3 className="font-bold text-lg mb-1">{name}</h3>

      <p className="text-sm leading-4 mb-1">{description}</p>

      <div className="flex grow">
        <span className="text-2xl font-bold grow">${price}</span>
        <button
          onClick={addProduct}
          className="bg-emerald-400 text-white py-1 px-3 rounded-xl"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Product;
