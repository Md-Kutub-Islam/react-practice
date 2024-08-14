import React, { useRef, useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const emptyArr = ["", "", "", ""];
  const [input, setInput] = useState(emptyArr);
  const [isLogin, setIsLogin] = useState(false);
  const refs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    refs[0].current.focus();
  }, []);

  const handleOnChange = (e, index) => {
    // if(ref)
    const val = e.target.value;
    if (index < input.length - 1) {
      refs[index + 1].current.focus();
    }
    const copyInput = [...input];
    copyInput[index] = val;
    setInput(copyInput);
  };

  const handleOnKeyDown = (e, index) => {
    if (e.keyCode === 8) {
      const copyInputs = [...input];
      copyInputs[index] = "";
      setInput(copyInputs);

      if (index > 0) {
        refs[index - 1].current.focus();
      }
    }
  };

  // console.log(i);
  console.log(input);

  const handleOnclick = () => {
    for (let i = 0; i < input.length; i++) {
      if (input[i] !== "") {
        setIsLogin(true);
        alert("Login Successfuly!");
      }
    }
  };

  return (
    <div className="App">
      <div>
        {emptyArr.map((item, index) => (
          <input
            ref={refs[index]}
            key={index}
            type="text"
            value={input[index]}
            onChange={(e) => handleOnChange(e, index)}
            onKeyDown={(e) => handleOnKeyDown(e, index)}
            required
            maxLength="1"
          />
        ))}
      </div>

      <button onClick={handleOnclick}>Submit</button>
    </div>
  );
}

export default App;
