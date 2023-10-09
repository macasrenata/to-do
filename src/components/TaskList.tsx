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
  const [newSubTask, setNewSubTask] = useState<string>('');
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(); 

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

  const handleKeyPressSubtask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      addSubTask();
    }
    console.log('----');
  };

  const addSubTask = () => {
    // preciso achar o elemento inicial seria a task da lista e adicionar a subtask nele
      const updatedTasks = [...tasks];
      const subtask = updatedTasks[selectedTaskIndex];
      const task = updatedTasks[selectedTaskIndex -1];

     if (task) {
        // const newSubtask: Subtask = {
        //   title: newSubTask,
        //   completed: false,
        // };


        task.subtasks.push(subtask);
        setTasks(updatedTasks);
        setNewSubTask('');
      }

  };

  const toggleSubtaskComplete = (taskIndex: number, subtaskIndex: number) => {
    const updatedTasks = [...tasks];
    const task = updatedTasks[taskIndex];
    if (task) {
      const subtask = task.subtasks[subtaskIndex];
      if (subtask) {
        subtask.completed = !subtask.completed;
        setTasks(updatedTasks);
      }
    }
  };

  const handleTaskClick = (taskIndex: number) => {
    if (selectedTaskIndex === taskIndex) {
      setSelectedTaskIndex(null);
    } else {
      setSelectedTaskIndex(taskIndex);
    }
  };


  return (
    <div className="bg-charcoal-700 text-white p-4 rounded-lg shadow-lg">
      <h1 className="text-2xl mb-4">Task List</h1>
      <input
        type="text"
        placeholder="new task"
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
            <label
              className="flex items-center text-white cursor-pointer"
              onClick={() => handleTaskClick(taskIndex)}

            >
              <input
                type="checkbox"
                onChange={() => toggleTaskComplete(taskIndex)}
                className="mr-2 h-6 w-6 rounded-full border border-white bg-transparent text-white appearance-none focus:outline-none"
              />
              <input 
              className="text-2xl mb-4 text-black"
              value={task.title}
              onChange={(e) => {
                const updatedTasks = [...tasks];
                const task = updatedTasks[taskIndex];
                if (task) {
                  task.title = e.target.value;
                  setTasks(updatedTasks);
                }
              }}
              onKeyDown={  handleKeyPressSubtask }
             />
            </label>
            <ul className="list-none p-0">
              {selectedTaskIndex === taskIndex && (
                <li className="mb-2 p-2">
                  {/* <input
                    type="text"
                    placeholder="new subtask"
                    value={newSubTask}
                    onChange={(e) => setNewSubTask(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addSubTask();
                      }
                    }}
                    className="border-b-2 border-white bg-charcoal-700 focus:outline-none p-2 text-white mb-2"
                  /> */}
                </li>
              )}
              {task.subtasks.map((subtask, subtaskIndex) => (
                <li
                  key={subtaskIndex}
                  className={`mb-2 p-2 ${subtask.completed ? 'line-through' : ''}`}
                >
                  <label className="flex items-center text-white">
                    <input
                      type="checkbox"
                      onChange={() => toggleSubtaskComplete(taskIndex, subtaskIndex)}
                      className="mr-2 h-6 w-6 rounded-full border border-white bg-transparent text-white appearance-none focus:outline-none"
                    />
                    {subtask.title}
                  </label>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default TaskList;


