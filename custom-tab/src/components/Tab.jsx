import React, { useEffect, useState } from "react";

function Tab(props) {
  const [tabHeader, setTabHeader] = useState([]);
  const [tabMap, setTabMap] = useState({});
  const [active, setActive] = useState("");

  const { children } = props;

  console.log(props);
  useEffect(() => {
    const headers = [];
    const map = {};
    React.Children.forEach(children, (element) => {
      console.log("Element:", element);
      if (!React.isValidElement(element)) return;

      const { title } = element.props;
      headers.push(title);
      map[title] = element.props.children;
      console.log("element.props.childern:", element.props.children);
    });
    console.log("map:", map);
    setTabHeader(headers);
    setActive(headers[0]);
    setTabMap(map);
  }, [props, children]);
  const handleOnClick = (header) => {
    setActive(header);
  };
  return (
    <div>
      <div className="headers">
        {tabHeader.map((ele) => (
          <button key={ele} onClick={() => handleOnClick(ele)}>
            {ele}
          </button>
        ))}
      </div>

      <div>
        {Object.keys(tabMap).map((key, index) => {
          if (key === active) {
            return <div key={index}>{tabMap[key]}</div>;
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}

export default Tab;
