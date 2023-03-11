import Layout from "@/components/Layout";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "@/context/ProductsContext";

const CheckoutPage = () => {
  // context
  const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);

  // products state
  const [productsInfos, setProductsInfos] = useState([]);
  // form state
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

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

  // calculate total
  let subtotal = 0;
  if (selectedProducts?.length) {
    for (let id of selectedProducts) {
      const price =
        productsInfos.find((product) => product._id === id)?.price || 0;
      subtotal += price;
    }
  }

  const deliveryPrice = 5;
  const total = subtotal + deliveryPrice;

  return (
    <Layout>
      {!productsInfos.length && <p>No products in cart</p>}
      {productsInfos.length &&
        productsInfos.map((product) => {
          const amount = selectedProducts.filter(
            (id) => id === product._id
          ).length;
          if (amount === 0) return;
          return (
            <div key={product._id} className="flex mb-5">
              <div className="bg-gray-100 p-3 rounded-xl shrink-0 max-h-32">
                <img
                  className="w-24 "
                  src={product.picture}
                  alt={product.name}
                />
              </div>
              <div className="px-3 py-1 flex flex-col">
                <div className="grow pb-2">
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <p className="text-sm leading-4 text-gray-500">
                    {product.description}
                  </p>
                </div>

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
                      {
                        selectedProducts.filter((id) => product._id === id)
                          .length
                      }
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
          );
        })}
      <form action="/api/checkout" method="post">
        <div className="mt-4">
          <input
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="text"
            placeholder="Street address, number"
            value={address}
            name="address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="text"
            placeholder="City and postal code"
            value={city}
            name="city"
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="text"
            placeholder="Your names"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="email"
            placeholder="Email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <div className="flex my-3">
            <h3 className="grow font-bold text-gray-400">Subtotal: </h3>
            <p className="font-bold">${subtotal}</p>
          </div>
          <div className="flex my-3">
            <h3 className="grow font-bold text-gray-400">Delivery: </h3>
            <p className="font-bold">${deliveryPrice}</p>
          </div>
          <div className="flex my-3 border-t-2 border-dashed border-emerald-500 pt-3">
            <h3 className="grow font-bold text-gray-400">Total: </h3>
            <p className="font-bold">${total}</p>
          </div>
        </div>
        <input
          type="hidden"
          name="products"
          value={selectedProducts.join(",")}
        />
        <button className="bg-emerald-500 p-5 text-white w-full font-bold rounded-xl my-4 shadow-md shadow-emerald-300">
          Pay ${total}
        </button>
      </form>
    </Layout>
  );
};

export default CheckoutPage;
