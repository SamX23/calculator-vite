import { useState } from "react";
import "./App.css";

function App() {
  const [result, setResult] = useState(0);
  const [currentValue, setCurrentValue] = useState([]);
  const [operation, setOperation] = useState([]);

  const replaceComma = (str) => str.replaceAll(",", "");

  const onClearHandle = () => {
    setResult(0);
    setCurrentValue([]);
    setOperation([]);
  };

  const onsetCurrentValue = (e) => {
    const number = e.target.value;
    setCurrentValue([...currentValue, number]);
    setResult(replaceComma(currentValue.join()));
  };

  const onAddOperation = (e) => {
    const operator = e.target.value;
    const number = replaceComma(currentValue.join());

    setOperation([...operation, `${number}${operator}`]);
    setCurrentValue([]);
  };

  const onSubmit = () => {
    let stringNumber = operation.join();
    const lastIndex = stringNumber[stringNumber.length - 1];

    stringNumber =
      lastIndex != Number ? stringNumber.slice(0, -1) : stringNumber;

    const result = replaceComma(stringNumber);

    setResult(eval(result));
    setOperation([]);
  };

  return (
    <>
      <button id="display">{result}</button>
      <button id="clear" onClick={onClearHandle}>
        CLR
      </button>
      <button id="decimal" value="." onClick={onAddOperation}>
        .
      </button>
      <button id="add" value="+" onClick={onAddOperation}>
        +
      </button>
      <button id="subtract" value="-" onClick={onAddOperation}>
        -
      </button>
      <button id="multiply" value="*" onClick={onAddOperation}>
        *
      </button>
      <button id="divide" value="/" onClick={onAddOperation}>
        /
      </button>
      <button id="equals" value="=" onClick={onSubmit}>
        =
      </button>
      <button id="one" value="1" onClick={onsetCurrentValue}>
        1
      </button>
      <button id="two" value="2" onClick={onsetCurrentValue}>
        2
      </button>
      <button id="three" value="3" onClick={onsetCurrentValue}>
        3
      </button>
      <button id="four" value="4" onClick={onsetCurrentValue}>
        4
      </button>
      <button id="five" value="5" onClick={onsetCurrentValue}>
        5
      </button>
      <button id="six" value="6" onClick={onsetCurrentValue}>
        6
      </button>
      <button id="seven" value="7" onClick={onsetCurrentValue}>
        7
      </button>
      <button id="eight" value="8" onClick={onsetCurrentValue}>
        8
      </button>
      <button id="nine" value="9" onClick={onsetCurrentValue}>
        9
      </button>
      <button id="zero" value="0" onClick={onsetCurrentValue}>
        0
      </button>
    </>
  );
}

export default App;
