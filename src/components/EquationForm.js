import React, { useState } from "react";

function EquationForm({ Equation, OnSuccess }) {
  const [Input, setInput] = useState("");
  const [WrongAns, setWrongAns] = useState(false);

  const Enter = () => {
    const result = eval(Equation);
    console.log(result);

    if (Input == result) {
      setInput("");
      OnSuccess();
    } else setWrongAns(true);
  };

  return (
    <div>
      <div className="equation">
        {Equation} ={" "}
        <input
          type="number"
          className={WrongAns ? "wrongAns" : ""}
          onAnimationEnd={() => setWrongAns(false)}
          value={Input}
          onInput={(e) => setInput(e.target.value)}
        />
      </div>
      <button className="enterBtn" type="submit" onClick={Enter}>
        Enter
      </button>
    </div>
  );
}

export default EquationForm;
