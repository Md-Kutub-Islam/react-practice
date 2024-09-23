import React, { useState } from "react";
import "./App.css";
import { data } from "./json-data/formData";

function App() {
  const [formData, setFormData] = useState(data);
  const [isPassMatch, setIsPassMatch] = useState(true);

  const handleOnChange = (e) => {
    const key = e.target.id;
    const val = e.target.value;
    const copyFormData = { ...formData };

    copyFormData[key].value = val;
    setFormData(copyFormData);
    isValidForm();
  };

  const paswordMatch = () => {
    const copyFormData = { ...formData };
    const pass = copyFormData["password"].value;
    const confPass = copyFormData["confirmPassword"].value;

    if (pass !== confPass) {
      setIsPassMatch(false);
    } else {
      setIsPassMatch(true);
    }
  };

  const isValidForm = () => {
    const copyFormData = { ...formData };
    Object.keys(copyFormData).forEach((key) => {
      const obj = copyFormData[key];
      obj.isError = !obj.value ? true : false;
      paswordMatch();
    });
    setFormData(copyFormData);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    isValidForm();
  };
  return (
    <div>
      <form>
        {Object.keys(formData).map((key) => {
          const { id, lable, type, value, placeholder, isError, errorMsg } =
            data[key];

          return (
            <div>
              <lable>{lable}</lable>
              <input
                id={id}
                type={type}
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value}
                isError={isError}
                errorMsg={errorMsg}
              />
              {isError && <span>{errorMsg}</span>}
              {key === "confirmPassword" && !isPassMatch && (
                <span>Password does not match</span>
              )}
            </div>
          );
        })}

        <div>
          <button onSubmit={handleFormSubmit}>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
