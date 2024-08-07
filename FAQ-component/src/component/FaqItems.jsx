import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropdownCircle } from "react-icons/io";

function FaqItems({ value, index }) {
  const [isShow, setIShow] = useState(false);

  useEffect(() => {
    if (index === 0) {
      setIShow(true);
    }
  }, []);
  return (
    <div className="faqItems">
      <div className="question">
        {!isShow ? (
          <IoIosArrowDroprightCircle onClick={() => setIShow(!isShow)} />
        ) : (
          <IoIosArrowDropdownCircle onClick={() => setIShow(!isShow)} />
        )}
        <span>{value.question}</span>
      </div>
      {isShow && <span>{value.answer}</span>}
    </div>
  );
}

export default FaqItems;
