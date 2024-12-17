import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router";
import { Tasks } from "./components/Tasks";
import { Task } from "./components/Task";


function App() {
    return (
      
      
      <Routes>
        <Route path="/" element={<Tasks/>} />
        <Route path="/task/:id" element={<Task/>} />
      </Routes>

    );
}

export default App;
