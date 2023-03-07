import { useState } from "react";
import { initMongoose } from "@/lib/mongoose";
import { findAllProducts } from "./api/products";
import Product from "@/components/product";

import Layout from "@/components/Layout";

export default function Home({ products }) {
  const [search, setSearch] = useState("");

  const categoriesNames = [
    ...new Set(products.map((product) => product.category)),
  ];

  let productsFiltered;
  if (search) {
    productsFiltered = products.filter((product) => {
      return product.name.toLowerCase().includes(search.toLowerCase());
    });
  } else {
    productsFiltered = products;
  }

  return (
    <div>
      <Layout>
        <input
          type="text"
          placeholder="Search for products..."
          className="bg-gray-100 w-full py-2 px-4 rounded-xl"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <div>
          {categoriesNames.map((categoryName) => (
            <div key={categoryName}>
              {productsFiltered.find(
                (product) => product.category === categoryName
              ) && (
                <div>
                  <h2 className="text-2xl py-5 capitalize">{categoryName}</h2>
                  <div className="flex gap-5 overflow-x-scroll snap-x scrollbar-hide">
                    {productsFiltered
                      .filter((products) => products.category === categoryName)
                      .map((product) => (
                        <div key={product._id} className="snap-start">
                          <Product {...product} />
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  await initMongoose();
  const products = await findAllProducts();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
