import React, { useState } from "react";
import "./App.css";
import { useEffect } from "react";

// [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8,]
const getNums = () => {
  const list = [];
  for (let i = 1; i <= 8; i++) {
    list.push(i);
    list.push(i);
  }
  return list;
};

// 6x6 => 36/2
// 4x4 => 16/2

function App() {
  const [nums, setNums] = useState(getNums());
  const [stage, setStage] = useState("init");
  const [opened, setOpened] = useState([]);
  const [solvesdList, setSolvesdList] = useState([]);

  const randomNums = () => {
    const copyNums = [...nums];
    return copyNums.sort(() => Math.random() - 0.5);
  };
  console.log(nums);
  const handleStart = () => {
    setStage("start");
    setNums(randomNums());
    setSolvesdList([]);
  };

  const handleClick = (num, index) => {
    if (opened.length === 2) return;
    setOpened((prev) => [...prev, index]);
  };

  useEffect(() => {
    if (opened.length === 2) {
      setTimeout(() => {
        const id1 = opened[0];
        const id2 = opened[1];
        if (nums[id1] === nums[id2]) {
          //if equal than remove crad
          setSolvesdList((prev) => [...prev, nums[id2]]);
        }
        setOpened([]);
      }, 1000);
    }
  }, [opened]);

  const getClassName = (num, index) => {
    if (solvesdList.includes(num)) {
      return "remove";
    } else if (opened.includes(index)) {
      return "show";
    } else {
      return "hide";
    }
  };

  useEffect(() => {
    if (solvesdList.length === 8) setStage("win");
  }, [solvesdList]);

  return (
    <div className="App">
      <h1>Memory game</h1>

      {stage === "init" && <button onClick={handleStart}>Play Game</button>}

      {stage === "start" && (
        <div className="game">
          <div className="cards">
            {nums.map((num, index) => (
              <div
                key={index}
                className={`card ${getClassName(num, index)}`}
                onClick={() => handleClick(num, index)}
              >
                {num}
              </div>
            ))}
          </div>
        </div>
      )}
      {stage === "win" && (
        <div>
          <h1>You won the Game!</h1>
          <button onClick={handleStart}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default App;
