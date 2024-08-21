import React from "react";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import debounceQuery from "./utils/debounce";

function App() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);

  const fetchData = async () => {
    const url = `https://api.frontendeval.com/fake/food/${input}`;
    const data = await debounceQuery(url);
    setList(data);
  };

  useEffect(() => {
    fetchData();
  }, [input]);
  return (
    <div>
      <h1>Debounce call</h1>
      <input type="text" onChange={(e) => setInput(e.target.value)} />

      <div>
        {list &&
          list.length > 0 &&
          list?.map((item, index) => <div key={index}>{item}</div>)}
      </div>
    </div>
  );
}

export default App;
