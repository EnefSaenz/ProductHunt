import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import useProducts from "../hooks/useProducts";
import ProductDetails from "../components/layout/ProductDetails";

const Search = () => {
  const router = useRouter();
  const {
    query: { q },
  } = router;

  // Querying all products
  const { products } = useProducts("created");
  const [result, setResult] = useState([]);

  useEffect(() => {
    const search = q.toLowerCase();
    const filter = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search)
      );
    });

    setResult(filter);
  }, [q, products]);

  return (
    <div>
      <Layout>
        <div className="list-products">
          <div className="container">
            {result.length === 0 ? (
              <div className="lds-hourglass"></div>
            ) : (
              <ul className="bg-white">
                {result.map((product) => (
                  <ProductDetails key={product.id} product={product} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Search;
