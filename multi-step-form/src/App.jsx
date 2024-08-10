import React from "react";
import "./App.css";
import { useState } from "react";

function App() {
  const [index, setIndex] = useState(0);
  const [dummyForm, setDummyForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [form, setForm] = useState(dummyForm);
  const [success, setSuccess] = useState(false);
  const formData = [
    {
      id: "name",
      type: "text",
      placeholder: "Enter Name...",
      buttonName: "Next",
    },
    {
      id: "email",
      type: "email",
      placeholder: "Enter Email...",
      buttonName: "Next",
    },
    {
      id: "password",
      type: "password",
      placeholder: "Enter Password...",
      buttonName: "Submit",
    },
  ];

  console.log(dummyForm);

  const handleOnClick = () => {
    // e.preventDefault();
    if (index === formData.length - 1) {
      setSuccess(true);
      console.log("sucess");
    } else {
      setIndex(index + 1);
    }
  };

  console.log(index);

  const handleOnChange = (e) => {
    const val = e.target.value;
    const id = e.target.id;

    const copyDummyForm = { ...dummyForm };
    copyDummyForm[id] = val;
    console.log("value:", id);

    console.log("obj: ", copyDummyForm[id]);

    setDummyForm(copyDummyForm);
  };
  return (
    <div className="box">
      {!success ? (
        <div>
          <label>{formData[index].id}</label>
          <br />
          <input
            value={dummyForm[formData[index].id]}
            id={formData[index].id}
            type={formData[index].type}
            placeholder={formData[index].placeholder}
            onChange={(e) => handleOnChange(e)}
            required
          />

          <button onClick={() => handleOnClick()}>
            {formData[index].buttonName}
          </button>
        </div>
      ) : (
        <div>
          <h1>Success !</h1>
          <hr />
          <span>Name : {dummyForm.name}</span>
          <br />
          <span>Email : {dummyForm.email}</span>
          <br />
          <span>dob : {dummyForm.dob}</span>
          <br />
          <span>password : {dummyForm.password}</span>
        </div>
      )}
    </div>
  );
}

export default App;
