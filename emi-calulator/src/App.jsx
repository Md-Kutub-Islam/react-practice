import { useEffect, useState } from "react";
import SliderInput from "./components/slider-input";
import { TextInput } from "./components/text-input";
import { numberWithComma } from "./utills/config";
import { tenureData } from "./utills/consttant";
import "./App.css";

function App() {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);

  const calculatorEMI = (downPayment) => {
    // EMI formula = [P x R x (1+R)^N]/[(1+R)^N-1]
    if (!cost) return;

    const loanAmt = cost - downPayment; // p
    const rateOfInterest = interest / 10; // R
    const numOfYear = tenure / 12;

    const EMI =
      (loanAmt * rateOfInterest * (1 + rateOfInterest) ** numOfYear) /
      ((1 + rateOfInterest) ** numOfYear - 1);

    return Number(EMI / 12).toFixed(0);
  };

  const calculatorDp = (emi) => {
    if (!cost) return;

    const downPaymentPercent = 100 - (emi / calculatorEMI(0)) * 100;
    return Number((downPaymentPercent / 100) * cost).toFixed(0);
  };

  useEffect(() => {
    if (!(cost > 0)) {
      setDownPayment(0);
      setEmi(0);
    }

    const emi = calculatorEMI(downPayment);
    setEmi(emi);
  }, [tenure]);

  const updateEmi = (e) => {
    if (!cost) return;

    const dp = Number(e.target.value);
    setDownPayment(dp.toFixed(0));

    // calculate emi and update
    const emi = calculatorEMI(dp);
    setEmi(emi);
  };

  const updateDownPayment = (e) => {
    if (!cost) return;

    const emi = Number(e.target.value);
    setEmi(emi.toFixed(0));

    // calculate downPayment and update it
    const dp = calculatorDp(emi);
    setDownPayment(dp);
  };

  const totalDownPayment = () => {
    return numberWithComma(
      (Number(downPayment) + (cost - downPayment) * (fee / 100)).toFixed(0)
    );
  };

  const totalEMI = () => {
    return numberWithComma((emi * tenure).toFixed(0));
  };
  return (
    <div className="App">
      <h6>EMI Calculator</h6>

      <TextInput title="Total Cost of Assets" state={cost} setState={setCost} />

      <TextInput
        title="Interest Rate (in %)"
        state={interest}
        setState={setInterest}
      />

      <TextInput title="Processing Fee (in %)" state={fee} setState={setFee} />

      <SliderInput
        title="Down Payment"
        underlineTitle={`Total Down Payment - ${totalDownPayment()}`}
        onChange={updateEmi}
        state={downPayment}
        min={0}
        max={cost}
        labelMin={"0%"}
        labelMax={"100%"}
      />

      <SliderInput
        title="Loan per Month"
        underlineTitle={`Total Loan Amount - ${totalEMI()}`}
        onChange={updateDownPayment}
        state={emi}
        min={calculatorEMI(cost)}
        max={calculatorEMI(0)}
      />

      <span className="title">Tenure</span>
      <div>
        {tenureData.map((t) => {
          return (
            <button
              className={`tenure ${t === tenure ? "selected" : ""}`}
              onClick={() => setTenure(t)}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
