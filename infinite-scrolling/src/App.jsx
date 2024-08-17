import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { useRef } from "react";

// https://jsonplaceholder.typicode.com/photos?_page=${index}&_limit=9

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const loderRef = useRef();

  const fetchData = async (index) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos?_page=${index}&_limit=9`
    );
    const responseData = await response.json();
    return responseData;
  };

  const getData = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    const data = await fetchData(page);
    setData((prev) => [...prev, ...data]);
    setLoading(false);
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        getData();
      }
    });

    if (loderRef.current) {
      observer.observe(loderRef.current);
    }

    return () => {
      if (loderRef.current) {
        observer.unobserve(loderRef.current);
      }
    };
  }, []);

  const fetchingfirstPageData = async () => {
    const data = await fetchData(1);
    setData(data);
  };
  useEffect(() => {
    fetchingfirstPageData(1);
  }, []);

  console.log(data);

  return (
    <div className="App">
      {data &&
        data?.map((item, index) => (
          <img key={index} src={item.thumbnailUrl} alt="image" />
        ))}

      <div ref={loderRef}>{loading && <h1>Loading...</h1>}</div>
    </div>
  );
}

export default App;
