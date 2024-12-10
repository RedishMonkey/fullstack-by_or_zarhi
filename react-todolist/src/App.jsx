import { useState } from 'react'
import './index.css'

function App() {

  const [tasks, setTasks] = useState([])

  return (
    <>
      <div className='centerBox'>
        <h1>To-Do List</h1>
        <div>
          <input type='text' id='addTaskTxt' className='addTaskText' placeholder='enter a new task here'/>
          <button className='addTaskBtn' > add </button>
        </div>

      </div>
    </>
  )
}

export default App
