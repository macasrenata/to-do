import React, { useState, useEffect, KeyboardEvent } from 'react';

interface Task {
  title: string;
  subtasks: Subtask[];
  completed: boolean;
}

interface Subtask {
  title: string;
  completed: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
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
    const newTaskObject: Task = { title: newTask, completed: false, subtasks: [] };
    setTasks([...tasks, newTaskObject]);
    setNewTask('');
  };

  const toggleTaskComplete = (taskIndex: number) => {
    const updatedTasks = [...tasks];
    const task = updatedTasks[taskIndex];
    if (task) {
      task.completed = !task.completed;
      setTasks(updatedTasks);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="bg-charcoal-700 text-white p-4 rounded-lg shadow-lg">
      <h1 className="text-2xl mb-4">Lista de Tarefas</h1>
      <input
        type="text"
        placeholder="Nova Tarefa"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyPress={handleKeyPress}
        className="border-b-2 border-white bg-charcoal-700 focus:outline-none p-2 text-white mb-4"
      />
      <ul className="list-none p-0">
        {tasks.map((task, taskIndex) => (
          <li
            key={taskIndex}
            className={`mb-2 p-2 ${task.completed ? 'line-through' : ''}`}
          >
            <label className="flex items-center text-white">
              <input
                type="checkbox"
                onChange={() => toggleTaskComplete(taskIndex)}
                className="mr-2 h-6 w-6 rounded-full border border-white bg-transparent text-white appearance-none focus:outline-none"
              />
              {task.title}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
