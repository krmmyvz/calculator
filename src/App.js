import { useState, useEffect } from "react";
import * as math from "mathjs";
import "./App.css";
import "./assets/Eurostile.ttf";

function App() {
  const [currentValue, setCurrentValue] = useState("0");

  const setWidthHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
    doc.style.setProperty("--app-width", `${window.innerWidth}px`);
  };
  useEffect(() => {
    window.addEventListener("resize", setWidthHeight);
    setWidthHeight();
    return () => {
      window.removeEventListener("resize", setWidthHeight);
    };
  }, []); // Only call useEffect once when the component first renders

  function handleInput(event) {
    const value = event.target.value;
    console.log(value);
    if (value === "+/-") {
      setCurrentValue(
        currentValue === "" || currentValue === "0"
          ? "0"
          : currentValue.charAt(0) === "-"
          ? currentValue.slice(1)
          : "-" + currentValue
      );
    } else if (value === "÷") {
      setCurrentValue(currentValue + "/");
    } else if (value === "×") {
      setCurrentValue(currentValue + "*");
    } else if (value === "+") {
      setCurrentValue(currentValue + "+");
    } else if (value === "-") {
      setCurrentValue(currentValue + "-");
    } else if (value === ".") {
      setCurrentValue(currentValue + ".");
    } else {
      setCurrentValue(
        currentValue === "0" || currentValue === "Hatalı İfade"
          ? value
          : currentValue + value
      );
    }
  }

  function handleClear() {
    setCurrentValue("");
  }

  function handleCalculate() {
    try {
      const result = math.evaluate(currentValue);
      setCurrentValue(result.toString());
    } catch (error) {
      setCurrentValue("Error");
    }
  }

  return (
    <div className="App">
      <div className="cal">
        <div className="container">
          <div className="header">
            <div className="title-cont">
              <div className="title">Kasio</div>
              <div className="sub">Made by: Kerem Yavuz</div>
            </div>
            <div id="solar">
              <div className="panel grid"></div>
              <div className="panel grid"></div>
              <div className="panel"></div>
            </div>
          </div>

          <div className="screen">{currentValue || "0"}</div>
          <input type="hidden" className="outcome" value="2+2" />
          <div className="buttons">
          <button className="val">
              MC
            </button>
            <button className="val">
              MR
            </button>
            <button className="val">
              M-
            </button>
            <button className="val">
              M+
            </button>
            <button className="val" onClick={handleInput} value="/">
              &divide;
            </button>
            <button className="val" onClick={handleInput} value="+/-">
              &plusmn;
            </button>
            <button className="val num" onClick={handleInput} value="7">
              7
            </button>
            <button className="val num" onClick={handleInput} value="8">
              8
            </button>
            <button className="val num" onClick={handleInput} value="9">
              9
            </button>
            <button className="val" onClick={handleInput} value="*">
              &times;
            </button>
            <button className="val">
              --
            </button>
            <button className="val num" onClick={handleInput} value="4">
              4
            </button>
            <button className="val num" onClick={handleInput} value="5">
              5
            </button>
            <button className="val num" onClick={handleInput} value="6">
              6
            </button>
            <button className="val" onClick={handleInput} value="-">
              -
            </button>
            <button className="val clear" onClick={handleClear} value="+">
              C
            </button>
            <button className="val num" onClick={handleInput} value="1">
              1
            </button>
            <button className="val num" onClick={handleInput} value="2">
              2
            </button>
            <button className="val num" onClick={handleInput} value="3">
              3
            </button>
            <button className="val equal" onClick={handleInput} value="+">
              +
            </button>
            <button className="val num" onClick={handleInput} value="0">
              0
            </button>
            <button className="val num" onClick={handleInput} value="00">
              00
            </button>
            <button className="val num" onClick={handleInput} value=".">
              .
            </button>
            <button className="val" onClick={handleCalculate} value="=">
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
