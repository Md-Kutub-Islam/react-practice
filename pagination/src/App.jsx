import "./App.css";
import { useEffect, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const fetchData = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
    }
  };

  console.log(products);

  useEffect(() => {
    fetchData();
  }, []);

  const paginationHandler = (selectPage) => {
    if (selectPage >= 1 && products.length / 10 && selectPage !== page)
      setPage(selectPage);
  };
  return (
    <div>
      <h1>pagination</h1>
      {products.length > 0 && (
        <div className="products">
          {products &&
            products.slice(page * 10 - 10, page * 10).map((pro) => {
              return (
                <span className="span__single" key={pro.id}>
                  <img src={pro.thumbnail} alt={pro.title} />
                  <span>{pro.title}</span>
                </span>
              );
            })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination ">
          <span
            onClick={() => paginationHandler(page - 1)}
            className={page > 1 ? "" : "page__disable"}
          >
            ◀️
          </span>
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "paginaton__selected" : ""}
                onClick={() => paginationHandler(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            onClick={() => paginationHandler(page + 1)}
            className={page < products.length / 10 ? "" : "page__disable"}
          >
            ▶️
          </span>
        </div>
      )}
    </div>
  );
}
