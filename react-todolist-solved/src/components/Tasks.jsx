import { useEffect, useState } from "react";
import "./Tasks.css";
import React from 'react'
import { v4 as uuidv4 } from "uuid";

import { Trash2, Pencil, CheckCheck } from "lucide-react";
import { useNavigate } from "react-router";


export const Tasks = () => {
    
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [editIDTask, SetEditIDTask] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if(savedTasks){
            setTasks(savedTasks)
        }
    },[])
    
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks])

    

    function addTask() {
      if (!inputValue.trim()) return;
  
      const newTask = {
        id: uuidv4(),
        text: inputValue,
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }
  
    function deleteTask(id) {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
    }
  
    function toggleTaskCompleted(task) {
      const updatedTasks = tasks.map((t) => {
        if (t.id === task.id) {
          return {
            ...t,
            completed: !t.completed,
          };
        }
  
        return t;
      });
  
      setTasks(updatedTasks);
    }
    // function editTask()
    // {
    //   setInputValue(task.text)
    //   SetEditIDTask(task.id)
      
    // }  

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
          <button onClick={addTask}>add</button>
        </div>
        <ul className="task-list">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`${task.completed ? "completed" : ""}`}
            >
              <span onClick={() => navigate(`/task/${task.id}`)}>{task.text}</span>
              <div className="icons-wraper">
                <CheckCheck className="check" onClick={() => toggleTaskCompleted(task)}/>
                <Pencil className="edit" onClick={(task) => editTask(task)} />
                {/* <Trash2 className="trash" onClick={() => deleteTask(task.id)} /> */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
