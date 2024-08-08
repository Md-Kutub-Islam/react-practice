import React, { useState } from "react";
import "./App.css";

function App() {
  const [value, setValue] = useState(0);
  const [histroy, setHistory] = useState([]);
  const [undo, setUndo] = useState(0);
  const [redo, setRedo] = useState([]);

  const handleUndo = () => {
    if (histroy.length) {
      const copyHistory = [...histroy];
      const firstItem = copyHistory.shift();
      setHistory(copyHistory);
      setValue(firstItem.prev);

      const copyRedoList = [...redo];
      copyRedoList.push(firstItem);
      setRedo(copyRedoList);
    }
  };

  const handleRedo = () => {
    if (redo.length) {
      const copyredo = [...redo];
      const lastItem = copyredo.pop();
      setRedo(copyredo);

      const { action, prev, curr } = lastItem;
      setValue(curr);
      maintaimHistory(action, prev, curr);
    }
  };

  console.log("redo:", redo);

  const maintaimHistory = (key, prev, curr) => {
    console.log(key, prev, curr);
    const obj = {
      action: key,
      prev,
      curr,
    };
    const copyHistory = [...histroy];
    copyHistory.unshift(obj);
    setHistory(copyHistory);
  };

  const counterButton = (key) => {
    const val = parseInt(key);
    console.log(val);
    setValue((prev) => prev + val);
    maintaimHistory(key, value, val + value);
  };

  return (
    <div className="container">
      <h1>Undoable Counter</h1>
      <div className="undo-redo">
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
      </div>

      <div className="content">
        {[-100, -10, -1].map((val) => (
          <button onClick={() => counterButton(val)}>{val}</button>
        ))}

        <div>{value}</div>

        {["+100", "+10", " +1"].map((val) => (
          <button onClick={() => counterButton(val)}>{val}</button>
        ))}
      </div>

      <div className="">
        {histroy &&
          histroy.map((hist) => (
            <div className="row">
              <span>{hist.action}</span>
              <span>{`[${hist.prev} -> ${hist.curr}]`}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
