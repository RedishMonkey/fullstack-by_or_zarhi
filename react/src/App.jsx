import React, { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [users, setUsers] = useState([])
  const [count, setCount] = useState(5);

  useEffect(() => {
    console.log("use effect");
  }, [count]);

  

  console.log("app");

  return (
    <>
      <h1>App</h1>
      <button onClick={() => setCount(5)}> add </button>
    </>
  );
}
