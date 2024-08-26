import React from "react";

function ProgressBar({ progress, progressColer }) {
  const colorObj = {
    width: `${progress}%`,
    backgroundColor: progressColer,
    textAlign: "center",
    height: `${100}%`,
    borderRadius: "20px",
  };
  return (
    <div
      className="progress"
      style={{
        background: "lightGray",
        textAlign: "center",
      }}
    >
      <span className="span">{`${progress}%`}</span>
      <div style={colorObj}></div>
    </div>
  );
}

export default ProgressBar;
