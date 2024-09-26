import React from "react";

function Pagination({ product, page, handleOnClick }) {
  return (
    <div>
      <span onClick={() => handleOnClick(page - 1)}>◀️</span>
      {product &&
        [...Array(product.length / 10)].map((_, index) => (
          <span key={index} onClick={() => handleOnClick(index + 1)}>
            {index}
          </span>
        ))}
      <span onClick={() => handleOnClick(page + 1)}>▶️</span>
    </div>
  );
}

export default Pagination;
