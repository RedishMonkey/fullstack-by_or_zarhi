import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [number, setNumber] = useState(0);
  const [showCount, setShowCount] = useState(true)
  const [arr, setArr] = useState([1, 2, 3, 4, 5])

  const btnText = showCount? "hide": "show"

  function handleClick() {
    setNumber((prev) => prev + 1);
    setNumber((prev) => prev + 2);
    setNumber((prev) => prev + 3);
    setNumber((prev) => prev + 4);
  }
  
  function addItemArr()
  {
    setArr([...arr,arr.at(-1) + 1])
  }

  console.log("rendered");
  console.log(arr)

  return (
    <>
      <h1>YOU ARE A FAILURE</h1>
      {showCount && <h1>count: {number}</h1>}
      <button onClick={handleClick}>click me</button>
      <button onClick={() => setShowCount(!showCount) }> {btnText } </button>
        {arr.map((val, index) =>  (
          <h4 key = {index}>{val}</h4>)
          )}
      <button onClick={addItemArr}>
        add item to arr
      </button>

      
    </>
  );
}

export default App;
