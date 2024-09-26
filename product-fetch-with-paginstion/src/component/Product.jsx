import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";

function Product() {
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products?limit=100`);
      const data = await response.json();
      setProduct(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnClick = (selectedPage) => {
    console.log("click", selectedPage);

    if (selectedPage >= 1 && product.length / 10 && selectedPage !== page) {
      setPage(selectedPage);
    }
  };

  console.log(page);

  useEffect(() => {
    fetchProduct();
  }, [page]);
  return (
    <div>
      <h1>Product</h1>
      <div>
        {product &&
          product.slice(page * 10 - 10, page * 10).map((element) => (
            <div key={element.id}>
              <img
                src={element.images}
                alt="img"
                height="200px"
                width="200px"
              />
            </div>
          ))}
      </div>
      <Pagination product={product} page={page} handleOnClick={handleOnClick} />
    </div>
  );
}

export default Product;
