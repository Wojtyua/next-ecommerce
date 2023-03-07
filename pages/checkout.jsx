import Layout from "@/components/Layout";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "@/context/ProductsContext";

const CheckoutPage = () => {
  const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);
  const [productsInfos, setProductsInfos] = useState([]);

  // fetch products infos when selectedProducts changes
  useEffect(() => {
    const uniqIds = [...new Set(selectedProducts)];
    fetch("/api/products?ids=" + uniqIds.join(","))
      .then((res) => res.json())
      .then((data) => setProductsInfos(data));
  }, [selectedProducts]);

  // utils functions
  function removeProduct(id) {
    const pos = selectedProducts.indexOf(id);
    if (pos !== -1) {
      setSelectedProducts((prev) => {
        return prev.filter((_, index) => index !== pos);
      });
    }
  }

  function addProduct(id) {
    setSelectedProducts((prev) => [...prev, id]);
  }

  return (
    <Layout>
      {!productsInfos.length && <p>No products in cart</p>}
      {productsInfos.length &&
        productsInfos.map((product) => (
          <div key={product._id} className="flex mb-5">
            <div className="bg-gray-100 p-3 rounded-xl shrink-0">
              <img className="w-24" src={product.picture} alt={product.name} />
            </div>
            <div className="pl-4">
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-sm leading-4 text-gray-500">
                {product.description}
              </p>
              <div className="flex">
                <div className="grow">${product.price}</div>
                <div>
                  <button
                    onClick={() => removeProduct(product._id)}
                    className="border border-emerald-500 px-2 rounded-lg text-emerald-400"
                  >
                    -
                  </button>
                  <span className="px-2">
                    {selectedProducts.filter((id) => product._id === id).length}
                  </span>

                  <button
                    onClick={() => addProduct(product._id)}
                    className="bg-emerald-500 px-2 rounded-lg text-white"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </Layout>
  );
};

export default CheckoutPage;
