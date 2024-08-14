import React, { useState } from "react";
import "./App.css";

function App() {
  const calculator = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "+",
    "-",
    "*",
    "/",
    "=",
    "C",
  ];
  const [value, setValue] = useState("");

  // const handleOnClick = (e) => {
  //   const id = e.target.value;
  //   if (id === "C") setValue("");
  //   else if (id === "=") handleOnSubmit();
  //   else setValue((val) => val + id);
  // };

  const handleOnClick = (e) => {
    const id = e.target.id;
    if (id === "C") {
      setValue("");
    } else if (id === "=") {
      //produce a result
      handleOnSubmit();
    } else {
      setValue((val) => val + id);
    }
    console.log();
  };

  const handleOnchange = (e) => {
    setValue(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e?.preventDefault();

    try {
      const ans = eval(value);
      setValue(ans);
    } catch (error) {
      alert("Invalid Input");
    }
  };

  return (
    <div className="box ">
      <form onSubmit={handleOnSubmit}>
        <input value={value} type="text" onChange={handleOnchange} />
      </form>
      <div className="btn_box" onClick={handleOnClick}>
        {calculator.map((item, index) => (
          <button key={index} id={item}>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
