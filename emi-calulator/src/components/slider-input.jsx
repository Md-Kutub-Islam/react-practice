import React from "react";
import { numberWithComma } from "../utills/config";

function SliderInput({
  title,
  state,
  min,
  max,
  onChange,
  labelMin,
  labelMax,
  underlineTitle,
}) {
  return (
    <React.Fragment>
      <span className="title">{title}</span>
      {state > 0 && (
        <span className="title" style={{ textDecoration: "underline" }}>
          {underlineTitle}
        </span>
      )}
      <div>
        <input
          type="range"
          min={min}
          max={max}
          className="slider"
          value={state}
          onChange={onChange}
        />
        <div className="lables">
          <label>{labelMin ?? numberWithComma(min)}</label>
          <b>{numberWithComma(state)}</b>
          <label>{labelMax ?? numberWithComma(max)}</label>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SliderInput;
