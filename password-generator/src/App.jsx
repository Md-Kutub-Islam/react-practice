import { useState } from "react";
import PasswordStrengthIndicator from "./component/StrengthChecker";
import usePasswordGenerator from "./hooks/use-password-generator";
import "./App.css";

export default function App() {
  const [length, setLength] = useState(4);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);
  const [copied, setCopied] = useState(false);

  const handleCheckboxChange = (index) => {
    const updateCheckboxData = [...checkboxData];
    updateCheckboxData[index].state = !updateCheckboxData[index].state;
    setCheckboxData(updateCheckboxData);
  };

  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(!copied);

    setTimeout(() => {
      setCopied(false);
    }, [5000]);
  };

  return (
    <div className="container">
      {/* Password Text and copy */}
      {password && (
        <div className="header">
          <div className="title">{password}</div>
          <button className="copyBtn" onClick={handleCopy}>
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}

      {/* Cherecter Length */}
      <div className="charLength">
        <span>
          <label>Charecter Length</label>
          <label>{length}</label>
        </span>
        <input
          type="range"
          min="4"
          max="20"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>

      {/* Checkbox */}
      <div className="Checkboxes">
        {checkboxData &&
          checkboxData.map((checkbox, index) => {
            return (
              <div key={index}>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(index)}
                  checked={checkbox.state}
                />
                <label>{checkbox.title}</label>
              </div>
            );
          })}
      </div>
      {/* Strengh */}
      <PasswordStrengthIndicator password={password} />
      {/* Error Handling */}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}

      {/* Generete <Button></Button> */}
      <button
        className="generateBtn"
        onClick={() => {
          generatePassword(checkboxData, length);
        }}
      >
        Generate Password
      </button>
    </div>
  );
}
