
// components/TaskList.tsx localstorage

import { useEffect, useState } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, newTask]);
    setNewTask('');
  };

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleComplete = (index: number) => {
    const updatedTasks = [...tasks];
    if (updatedTasks[index]) {
      updatedTasks[index] = `✅ ${tasks[index]?.substring(2)}`;
    } 
    setTasks(updatedTasks);
  };



  return (
    <div>
      <h1 className="text-black mt-4">Add todo item</h1>
      <input
        type="text"
        placeholder="new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="text-black border rounded-lg p-2 m-2"
      />
      <button onClick={addTask} className="bg-blue-500 text-black px-3 py-2 rounded-lg">Add todo item</button>
      <ul className="list-none">
        {tasks.map((task, index) => (
          <li key={index} className="flex justify-between items-center border p-2 m-2 rounded-lg">
            <label className="flex items-center text-black">
              <input type="checkbox" onChange={() => toggleComplete(index)} className="text-black rounded-full h-6 w-6 border-gray-300 mr-2" />
              {task.startsWith('✅ ') ? (
                <del>{task.substring(2)}</del>
              ) : (
                task
              )}
            </label>
            <button onClick={() => deleteTask(index)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;







