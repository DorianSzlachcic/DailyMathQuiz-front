import "./App.css";
import EquationForm from "./components/EquationForm";
import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const url = "http://dailymathquiz-api.herokuapp.com/";

  const [Data, setData] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState(null);
  const [DidWin, setDidWin] = useState(false);

  const [EqNumber, setEqNumber] = useState(1);

  const fetchData = () => {
    fetch(url + EqNumber.toString())
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data... ", error);
        setError(error);
      })
      .finally(() => setLoading(false));
  };

  const onSuccess = () => {
    setEqNumber(EqNumber + 1);
    setLoading(true);
    fetchData();
  };

  const onWin = () => {
    setDidWin(true);
  };

  useEffect(() => fetchData(), []);

  if (Error) return "Error";

  return (
    <div className="App">
      {Loading ? <LoadingScreen /> : ""}

      <nav>
        <h1>DailyMathQuiz</h1>
      </nav>

      <div className="game">
        {DidWin ? (
          <h2>Super!</h2>
        ) : (
          <EquationForm
            Equation={Data}
            OnSuccess={EqNumber == 10 ? onWin : onSuccess}
          />
        )}
      </div>
    </div>
  );
}

export default App;
