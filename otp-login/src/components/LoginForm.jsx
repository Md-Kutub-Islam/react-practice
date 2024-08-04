import React, { useState } from "react";
import OtpInput from "./OtpInput";

function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePhoneSubmit = (event) => {
    event.preventDefault();

    const regex = /[^0-9]/g;
    if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
      alert("Invalid phone Number");
      return;
    }

    // show otp filed
    setShowOtp(true);
  };

  const onOtpSubmit = (otp) => {
    console.log("Login sucsessful:", otp);
  };
  return (
    <div>
      {!showOtp ? (
        <form onSubmit={handlePhoneSubmit}>
          <input
            type="text"
            value={phoneNumber}
            placeholder="Enter the number"
            onChange={handlePhoneNumber}
          />
          <button type="submit">submit</button>
        </form>
      ) : (
        <div>
          <p>Enter OTP sent to {phoneNumber}</p>
          <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
        </div>
      )}
    </div>
  );
}

export default LoginForm;
