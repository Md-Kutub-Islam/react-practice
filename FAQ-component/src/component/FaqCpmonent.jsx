import React from "react";
import { data } from "../faqData/data";
import FaqItems from "./FaqItems";

function FaqCpmonent() {
  return (
    <div className="faqCpmonent">
      {data &&
        data.map((value, index) => (
          <FaqItems key={index} value={value} index={index} />
        ))}
    </div>
  );
}

export default FaqCpmonent;
