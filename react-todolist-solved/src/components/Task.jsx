import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./Tasks"
import { Undo2 } from "lucide-react";

export const Task = () => {
  const [task, setTask] = useState({});
  const { id } = useParams();
  const navigate = useNavigate()


  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");

    if (storedTasks) {
      const task = JSON.parse(storedTasks).find((Task) => Task.id === id);
      setTask(task);
    }
  }, []);

  return (
    <div className="task-wrapper">
      <h1>Details</h1>
      <div>
        <p>{task.text}</p>
      </div>
      <Undo2 className="undo-icon" onClick={() => navigate(`/`)}/>
    </div>
  );
};
