import React from "react";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/users");
      if (!response.ok) {
        console.log("failed to fetch data");
        return;
      }

      const data = await response.json();
      setImages(data.users);
      setLoading(false);
    }

    fetchData();
  }, []);

  console.log(images);

  const handleOnClick = (dir) => {
    const lastIndex = images.length - 1;
    console.log(lastIndex);

    if (dir === "left") {
      if (index === 0) {
        setIndex(lastIndex);
      } else {
        setIndex((prev) => prev - 1);
      }
    } else if (dir === "right") {
      if (index === lastIndex) {
        setIndex(0);
      } else {
        setIndex((prev) => prev + 1);
      }
    }
  };

  return (
    <div className="box">
      {!loading ? (
        <>
          <button onClick={() => handleOnClick("left")}>{"<"}</button>
          <img src={images[index]?.image} alt="image" />
          <button onClick={() => handleOnClick("right")}>{">"}</button>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default App;
