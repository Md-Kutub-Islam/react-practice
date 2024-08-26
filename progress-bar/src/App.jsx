import React, { useEffect, useState } from "react";
import "./App.css";
import ProgressBar from "./components/ProgressBar";

function App() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const time = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 1);
      }
    }, 20);

    return () => {
      clearInterval(time);
    };
  }, [progress]);
  return (
    <div className="App">
      <h1>Progress Bar</h1>
      <ProgressBar progress={progress} progressColer={`red`} />
    </div>
  );
}

export default App;
