import { useState } from "react";

const usePasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const generatePassword = (checkboxData, length) => {
    let charSet = "";
    let generatedPassword = "";
    const selectionOption = checkboxData.filter((checkbox) => checkbox.state);

    if (selectionOption.length === 0) {
      setErrorMessage("Select at least one option.");
      setPassword("");
      return;
    }

    selectionOption.forEach((option) => {
      switch (option.title) {
        case "Include Uppercase Letters":
          charSet += "ABCDEFGHLIJKLMNOPQRSTUVWXYZ";
          break;

        case "Include Lowercase Letters":
          charSet += "abcdefghijklmnopqrstuvwxyz";
          break;

        case "Include Numbers":
          charSet += "0123456789";
          break;

        case "Include Symbols":
          charSet += "!@#$%^&*()_";
          break;

        default:
          break;
      }
    });

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      generatedPassword += charSet[randomIndex];
    }

    setPassword(generatedPassword);
    setErrorMessage("");
  };

  return { password, errorMessage, generatePassword };
};

export default usePasswordGenerator;
