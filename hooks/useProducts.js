import { useState, useContext, useEffect } from "react";

import { FirebaseContext } from "../firebase";

const useProducts = (order) => {
  //States
  const [products, setProducts] = useState([]);

  // Firebase context
  const { firebase } = useContext(FirebaseContext);

  // Effect for loading products
  useEffect(() => {
    const getProducts = async () => {
      const products = [];
      const productsSnapshot = await firebase.getProductsSnapshot(order);
      productsSnapshot.forEach((doc) => {
        const product = {
          id: doc.id,
          ...doc.data(),
        };
        products.push(product);
      });

      setProducts(products);
    };

    getProducts();
  }, []);

  return { products };
};

export default useProducts;
