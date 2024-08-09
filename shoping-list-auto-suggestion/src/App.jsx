import React, { useEffect, useState } from "react";
import "./App.css";
import SelectItem from "./component/SelectItem";

function App() {
  const [input, setinput] = useState("");
  const [isWriteTic, setIsWriteTic] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);

  useEffect(() => {
    if (input.length > 2) {
      function fetchData() {
        fetch(`https://dummyjson.com/recipes/search?q=${input}`)
          .then((res) => res.json())
          .then((data) => setSearchList(data));
      }

      fetchData();
    }
  }, [input]);

  const handleClick = (dataId) => {
    const filterdata =
      searchList && searchList?.recipes?.filter((data) => data.id === dataId);
    setSelectedItem((prev) => [...prev, ...filterdata]);
  };

  const handleRemove = (dataId) => {
    if (dataId) {
      const filterData = selectedItem.filter((item) => item.id !== dataId);
      setSelectedItem(filterData);
    }
  };

  const handleCheck = (dataId) => {
    if (dataId) {
      console.log(dataId);
      selectedItem.forEach((item) => {
        item.id === dataId ? setIsWriteTic(true) : "";
      });
    }
  };

  // console.log("searchList:", searchList);
  console.log("selectedItem:", selectedItem);

  return (
    <div className="container">
      <input
        type="text"
        placeholder="search"
        value={input}
        onChange={(e) => setinput(e.target.value)}
      />

      <div className="searchList">
        {searchList &&
          searchList?.recipes?.map((data, index) => (
            <li key={index} onClick={() => handleClick(data.id)}>
              <span>{data.name}</span>
            </li>
          ))}
      </div>

      <div className="selectedItem">
        {selectedItem &&
          selectedItem.map((data) => {
            return (
              <SelectItem
                key={data.id}
                data={data}
                handleCheck={handleCheck}
                handleRemove={handleRemove}
                isWriteTic={isWriteTic}
              />
            );
          })}
      </div>
    </div>
  );
}

export default App;
