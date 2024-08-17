import React, { useState } from "react";
import "./App.css";

function App() {
  const TODO = "TODO";
  const DONE = "DONE";
  const DOING = "DOING";
  const [value, setValue] = useState("");
  const [task, setTask] = useState([]);
  const [dragtask, setDragtask] = useState(null);

  const handleOnkeyDoen = (e) => {
    if (e.keyCode === 13) {
      const obj = {
        id: Date.now(),
        title: value,
        status: TODO,
      };
      // const copyTask = [...task]
      setTask((prevTask) => [...prevTask, obj]);
      setValue("");
    }
  };

  const handleOnDrag = (e, task) => {
    setDragtask(task);
  };

  const handleDragNDrop = (status) => {
    let copyTask = [...task];
    copyTask = copyTask.map((item) => {
      if (dragtask.id === item.id) {
        item.status = status;
      }
      return status;
    });
    setTask(copyTask);
    setDragtask(null);
  };

  const handleOnDrop = (e) => {
    const status = e.target.getAttribute("data-status");
    if (status === TODO) {
      handleDragNDrop(TODO);
    } else if (status === DOING) {
      handleDragNDrop(DOING);
    } else if (status === DONE) {
      handleDragNDrop(DONE);
    }
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  console.log(task);

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <input
        value={value}
        type="text"
        placeholder="Enter Task..."
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleOnkeyDoen}
      />

      <div className="container">
        <div
          className="todo"
          data-status={TODO}
          onDrop={handleOnDrop}
          onDragOver={handleOnDragOver}
        >
          <h2>Todo</h2>
          {task &&
            task.map(
              (task) =>
                task.status === TODO && (
                  <div>
                    <div
                      className="items"
                      key={task.id}
                      onDrag={(e) => handleOnDrag(e, task)}
                      draggable
                    >
                      <span>{task.title}</span>
                      <div className="btn">
                        <span>✏️</span>
                        <span>🪣</span>
                      </div>
                    </div>
                  </div>
                )
            )}
        </div>
        <div
          className="doing"
          data-status={DOING}
          onDrop={handleOnDrop}
          onDragOver={handleOnDragOver}
        >
          <h2>Doing</h2>
          {task.length > 0 &&
            task.map(
              (task) =>
                task.status === DOING && (
                  <div>
                    <div
                      className="items"
                      key={task.id}
                      onDrag={(e) => handleOnDrag(e, task)}
                      draggable
                    >
                      <span>{task.title}</span>
                      <div className="btn">
                        <span>✏️</span>
                        <span>🪣</span>
                      </div>
                    </div>
                  </div>
                )
            )}
        </div>
        <div
          className="done"
          data-status={DONE}
          onDrop={handleOnDrop}
          onDragOver={handleOnDragOver}
        >
          <h2>Done</h2>
          {task.length > 0 &&
            task.map(
              (task) =>
                task.status === DONE && (
                  <div>
                    <div
                      className="items"
                      key={task.id}
                      onDrag={(e) => handleOnDrag(e, task)}
                      draggable
                    >
                      <span>{task.title}</span>
                      <div className="btn">
                        <span>✏️</span>
                        <span>🪣</span>
                      </div>
                    </div>
                  </div>
                )
            )}
        </div>
      </div>
    </div>
  );
}

export default App;
