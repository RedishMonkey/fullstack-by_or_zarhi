import { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  function addTask() {
    if (!inputValue.trim()) return;

    const newTask = {
      id: uuidv4(),
      text: inputValue,
      completed: false,
    };
    setTasks([...tasks, newTask])
  }

  function deleteTask(id){
    const updatedTasks = tasks.filter((task) => task.id !== id)
    setTasks(updatedTasks)
  }

  function toggleTaskCompleted(task)
  {
    const updatedTasks = tasks.map((t) => {
      if(t.id===task.id){
        return {
          ...t,
          completed: !t.completed,
        };
      }

      return t
    })
    setTasks[updatedTasks]
  }

  return (
    <main>
      <div className="app">
        <h1>To-Do List</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="enter a task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button 
          onClick={addTask}
          >add</button>
        </div>
        <ul className="task-list">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`${task.completed ? "completed" : ""}`}
            >
              <span onClick={() => toggleTaskCompleted(task)}>{task.text}</span>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default App;
