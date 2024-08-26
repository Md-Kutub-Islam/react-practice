import React, { useState } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [leftBox, setLeftBox] = useState(["card1", "card2"]);
  const [rightBox, setRightBox] = useState(["card3", "card4"]);
  const [selectCard, setSelectCard] = useState([]);
  const [style, setStyle] = useState(false);

  const handleOnClickCard = (e) => {
    const cardItem = e.target.id;
    if (!selectCard.includes(cardItem)) {
      setSelectCard([...selectCard, cardItem]);
      setStyle(!style);
    } else {
      const filterData = selectCard.filter((ele) => ele !== cardItem);
      setSelectCard(filterData);
    }
  };

  const handleOnClick = (e) => {
    const id = e.target.id;
    if (id === "left") {
      setLeftBox([...leftBox, ...selectCard]);
      const filterData = rightBox.filter((ele) => !selectCard.includes(ele));
      setRightBox(filterData);
      setSelectCard([]);
    }
    if (id === "right") {
      setRightBox([...rightBox, ...selectCard]);
      console.log("rightBox", rightBox);

      const filterData = leftBox.filter((ele) => !selectCard.includes(ele));
      setLeftBox(filterData);
      setSelectCard([]);
    }
  };

  return (
    <div className="App">
      <h1>Transfer List</h1>
      <div className="container">
        <Card
          boxList={leftBox}
          handleOnClickCard={handleOnClickCard}
          style={style}
        />

        <div className="btn">
          {["left", "right"].map((btn, index) => (
            <button onClick={handleOnClick} key={index} id={btn}>
              {btn}
            </button>
          ))}
        </div>

        <Card
          boxList={rightBox}
          handleOnClickCard={handleOnClickCard}
          style={style}
        />
      </div>
    </div>
  );
}

export default App;
