import React from "react";

function Card({ boxList, handleOnClickCard, style }) {
  return (
    <div className="box" onClick={handleOnClickCard}>
      {boxList &&
        boxList.map((card, index) => (
          <span className={style ? "selectedCard" : ""} key={index} id={card}>
            {card}
          </span>
        ))}
    </div>
  );
}

export default Card;
