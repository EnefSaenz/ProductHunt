import React from "react";
import Layout from "../components/layout/Layout";
import ProductDetails from "../components/layout/ProductDetails";
import useProducts from "../hooks/useProducts";

const Popular = () => {
  const { products } = useProducts("votes");

  return (
    <div>
      <Layout>
        <div className="list-products">
          <div className="container">
            {products.length === 0 ? (
              <div className="lds-hourglass"></div>
            ) : (
              <ul className="bg-white">
                {products.map((product) => (
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

export default Popular;
