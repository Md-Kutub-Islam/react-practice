import React, { useEffect, useState } from "react";
import "./App.css";
import { items } from "./items";

function App() {
  const filterButton = ["Bags", "Watches", "Sports", "Sunglasses"];
  const [filterCategory, setFilterCategoty] = useState([]);
  const [filterData, setFilterData] = useState(items);

  const handelOnclick = (e) => {
    const id = e.target.id;
    console.log("id:", id);

    if (filterCategory.includes(id)) {
      const category = filterCategory.filter((filterCate) => filterCate !== id);
      setFilterCategoty(category);
    } else {
      setFilterCategoty([...filterCategory, id]);
    }
  };

  const filterProduct = () => {
    if (filterCategory.length) {
      const tempItem = items.filter((data) =>
        filterCategory.includes(data.category)
      );
      setFilterData(tempItem);
    } else {
      setFilterData(items);
    }
  };

  useEffect(() => {
    filterProduct();
  }, [filterCategory]);

  console.log(filterData);

  return (
    <div className="App">
      <h1>Product filter</h1>
      <div onClick={handelOnclick}>
        {filterButton.map((btn, index) => (
          <button key={index} id={btn}>
            {btn}
          </button>
        ))}
      </div>
      <div className="container">
        {filterData.map((item, index) => (
          <div className="card" key={index}>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
