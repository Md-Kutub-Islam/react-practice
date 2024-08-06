import React from "react";

function Pill({ image, text, onClick }) {
  return (
    <div className="user-pill" onClick={onClick}>
      <img src={image} alt={text} />
      <span>{text} &times;</span>
    </div>
  );
}

export default Pill;
