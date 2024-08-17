import React from "react";
import "./App.css";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [freq, setfreq] = useState(undefined);
  const [yAxix, setYAxix] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new"
      );
      let data = await response.text();
      data = data.split("\n").filter(Boolean);
      const map = {};
      data?.forEach((item) => {
        if (map[item]) {
          map[item] = map[item] + 1;
        } else {
          map[item] = 1;
        }
      });
      setfreq(map);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (freq) {
      const max = Math.max(...Object.values(freq));
      const maxVal = Math.ceil(max / 10) * 10;
      let arr = [];
      for (let i = maxVal / 10; i >= 0; i--) {
        arr.push(i * 10);
      }
      setYAxix(arr);
    }
  }, [freq]);

  console.log(yAxix);
  return (
    <div className="App">
      <div className="container">
        <div className="box">
          <div
            className="box-y-axis"
            style={{ height: `${yAxix && yAxix[0]}%` }}
          >
            {yAxix &&
              yAxix?.map((val, index) => (
                <div key={index}>
                  <span>{val}</span>
                </div>
              ))}
          </div>
          {freq &&
            Object.entries(freq)?.map(([key, value], index) => (
              <div className="box-x-axis" key={index}>
                <div style={{ height: `${value}%` }} className="graph"></div>
                <div className="index">{key}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
