import { useState } from "react";
import "./App.css";

function App() {
  const [currentValue, setCurrentValue] = useState([]);
  const [currentResult, setCurrentResult] = useState(0);

  const replaceComma = (str) => str.replaceAll(",", "");

  const onClearHandle = () => {
    setCurrentValue([]);
    setCurrentResult(0);
  };

  const onsetCurrentValue = (e) => {
    const currentInput = e.target.value;
    const operator = ["*", "+", "-", "/"];
    const operatorAttribute = e.target.dataset.attr;
    const ifValueEmpty = currentValue.length == 0;
    const ifCurrentInputIsNotZero = currentInput != 0;
    const lastInput = currentValue[currentValue.length - 1];

    const inputIsOperator = (input) => operator.includes(input);

    const isIsogram = (str) => {
      return /(.).*\1/.test(str);
    };

    let x = currentValue.some(function (v, i, a) {
      if (i === ".") {
        return a.lastIndexOf(v) != i;
      }
    });

    // Prevent zero and operator on first input
    const firstCalculation = () =>
      ifCurrentInputIsNotZero &&
      !inputIsOperator(currentInput) &&
      setCurrentValue([...currentValue, currentInput]);

    // First calculation
    if (currentResult == 0) {
      // On first input
      if (ifValueEmpty) {
        firstCalculation();
      } else {
        // On the second and rest input
        // If input is operator
        if (inputIsOperator(currentInput)) {
          // If last input was operator
          if (inputIsOperator(lastInput)) {
            const newArr = currentValue;

            // Add minus number if current input "-"
            if (currentInput == "-") {
              newArr.push(currentInput);

              // If last input was "-" operator, replace all operator (second and third added operator)
            } else if (lastInput == "-") {
              newArr.splice(newArr.length - 2, 2);
              newArr.push(currentInput);
            } else {
              newArr.push(currentInput);
            }

            setCurrentValue(newArr);
          } else {
            setCurrentValue([...currentValue, currentInput]);
          }
        } else {
          setCurrentValue([...currentValue, currentInput]);
        }
      }
    } else {
      // Additional calculation
      if (operatorAttribute) {
        setCurrentValue([...currentValue, currentResult, currentInput]);
      } else {
        // If no calculation, reset to calculate new result
        setCurrentResult(0);
        firstCalculation();
      }
    }
  };

  const onSubmit = () => {
    let previousValue = null;
    let newArr = [];

    if (currentValue.length > 0) {
      currentValue.forEach((value) => {
        if (value != previousValue) {
          newArr.push(value);
          previousValue = value;
        }
      });

      const joinedValue = newArr.join();
      const formattedNumber = replaceComma(joinedValue);
      const result =
        Math.round(1000000000000 * eval(formattedNumber)) / 1000000000000;

      setCurrentValue([]);
      setCurrentResult(result);
    }
  };

  return (
    <main className="calculator-container">
      <div className="calculator-header">
        <h2 className="calculator-title">Calculator</h2>
        <div className="calculator-display">
          <span className="calculator-calculation">
            {currentResult != 0 && currentResult}
          </span>
          <div id="display">
            {currentValue.length == 0
              ? currentResult
              : replaceComma(currentValue.join())}
          </div>
        </div>
      </div>

      <div className="calculator-body">
        <div className="calculator-btns">
          <button
            id="one"
            className="calculator-btnNumeric"
            value="1"
            onClick={onsetCurrentValue}
          >
            1
          </button>
          <button
            id="two"
            className="calculator-btnNumeric"
            value="2"
            onClick={onsetCurrentValue}
          >
            2
          </button>
          <button
            id="three"
            className="calculator-btnNumeric"
            value="3"
            onClick={onsetCurrentValue}
          >
            3
          </button>{" "}
          <button
            id="add"
            value="+"
            className="calculator-btnOperator"
            data-attr="operator"
            onClick={onsetCurrentValue}
          >
            +
          </button>
          <button
            id="four"
            className="calculator-btnNumeric"
            value="4"
            onClick={onsetCurrentValue}
          >
            4
          </button>
          <button
            id="five"
            className="calculator-btnNumeric"
            value="5"
            onClick={onsetCurrentValue}
          >
            5
          </button>
          <button
            id="six"
            className="calculator-btnNumeric"
            value="6"
            onClick={onsetCurrentValue}
          >
            6
          </button>
          <button
            id="subtract"
            value="-"
            className="calculator-btnOperator"
            data-attr="operator"
            onClick={onsetCurrentValue}
          >
            -
          </button>
          <button
            id="seven"
            className="calculator-btnNumeric"
            value="7"
            onClick={onsetCurrentValue}
          >
            7
          </button>
          <button
            id="eight"
            className="calculator-btnNumeric"
            value="8"
            onClick={onsetCurrentValue}
          >
            8
          </button>
          <button
            id="nine"
            className="calculator-btnNumeric"
            value="9"
            onClick={onsetCurrentValue}
          >
            9
          </button>
          <button
            id="multiply"
            value="*"
            className="calculator-btnOperator"
            data-attr="operator"
            onClick={onsetCurrentValue}
          >
            *
          </button>
          <button
            id="zero"
            className="calculator-btnNumeric"
            value="0"
            onClick={onsetCurrentValue}
          >
            0
          </button>
          <button
            id="divide"
            value="/"
            className="calculator-btnOperator"
            data-attr="operator"
            onClick={onsetCurrentValue}
          >
            /
          </button>
          <button
            id="clear"
            className="calculator-btnOperatorOption"
            onClick={onClearHandle}
          >
            AC
          </button>
          <button
            id="decimal"
            className="calculator-btnOperatorOption"
            value="."
            onClick={onsetCurrentValue}
          >
            .
          </button>
          <button
            id="equals"
            value="="
            className="calculator-btnOperator"
            onClick={onSubmit}
          >
            =
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
