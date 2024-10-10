import React, { useState } from "react";
import "./App.css";

function App() {
  const [isCardFlip, setIsCardFlip] = useState(false);

  const handleOnClick = () => {
    setIsCardFlip(!isCardFlip);
  };
  return (
    <div className="app">
      <div
        className={!isCardFlip ? `iscardTrue ` : `flipCard`}
        onClick={handleOnClick}
      >
        <span className="text">{isCardFlip ? "front" : "back"}</span>
      </div>
    </div>
  );
}

export default App;
