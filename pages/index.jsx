import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const categoriesNames = [
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <div className="p-5">
      <div>
        {categoriesNames.map((categoryName) => (
          <div key={categoryName}>
            <h2 className="text-2xl capitalize">{categoryName}</h2>
            {products
              .filter((products) => products.category === categoryName)
              .map((product) => (
                <div key={product.id}>{product.name}</div>
              ))}
          </div>
        ))}

        <div className="py-4">
          <div className="w-64">
            <div className="bg-blue-100 p-5 rounded-xl">
              <img src="/products/iphone.png" alt="iphone-image" />
            </div>
            <div className="mt-2">
              <h3 className="font-bold text-lg">Iphone 14 Pro</h3>
            </div>
            <p className="text-sm mt-1 leading-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit veniam laborum nulla a rerum, quae debitis
              repudiandae ducimus suscipit dolore.
            </p>
            <div className="flex mt-1">
              <div className="text-2xl font-bold grow">$999</div>
              <button className="bg-emerald-400 text-white py-1 px-3 rounded-xl">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
