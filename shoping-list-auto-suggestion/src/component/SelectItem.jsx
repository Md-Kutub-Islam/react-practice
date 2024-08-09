import React from "react";

function SelectItem({ data, handleCheck, handleRemove, isWriteTic }) {
  return (
    <div>
      <span onClick={() => handleCheck(data.id)}>&#10003;</span>
      <span style={{ textDecoration: isWriteTic ? "line-through" : "" }}>
        {data.name}
      </span>
      <span onClick={() => handleRemove(data.id)}>X</span>
    </div>
  );
}

export default SelectItem;
