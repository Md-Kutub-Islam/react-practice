import React from "react";
import "./App.css";
import Tab from "./components/Tab";

function App() {
  return (
    <div>
      <h1>Custom Tab</h1>
      <Tab>
        <div title="home">Home Tab</div>
        <div title="about">About Tab</div>
        <div title="service">Service Tab</div>
      </Tab>
    </div>
  );
}

export default App;
