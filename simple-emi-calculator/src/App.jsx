import React, { useState } from "react";
import "./App.css";

function App() {
  const [principale, setPrincipale] = useState(0);
  const [interest, setInterest] = useState(0);
  const [year, setYear] = useState(0);
  const [emi, setEmi] = useState(0);
  const handleOnChange = (e) => {
    console.log(e.target.id, e.target.value);
    const id = e.target.id;
    if (id === "principale") {
      setPrincipale(e.target.value);
    } else if (id === "interest") {
      setInterest(e.target.value);
    } else if (id === "year") {
      setYear(e.target.value);
    }
  };

  const handleOnSubmit = () => {
    let r = interest;
    if (principale && r && year) {
      r = r / 12 / 100; // per month
      const calcPow = Math.pow(1 + r, year * 12);
      const amount = principale * ((r * calcPow) / (calcPow - 1));
      setEmi(Math.round(amount));
    }
  };

  console.log(emi);

  return (
    <div className="App">
      <h1>Morged calculate</h1>

      <div className="calculator">
        <div>
          <p>Principale</p>
          <input type="number" id="principale" onChange={handleOnChange} />
        </div>
        <div>
          <p>Interest</p>
          <input type="number" id="interest" onChange={handleOnChange} />
        </div>
        <div>
          <p>Year</p>
          <input type="number" id="year" onChange={handleOnChange} />
        </div>

        <div className="btnSection">
          <button onClick={handleOnSubmit}>Calculate</button>
          <span>Total EMI: {emi}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
