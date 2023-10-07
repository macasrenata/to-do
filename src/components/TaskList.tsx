// // component com prisma e trpc

// import { useQuery, useMutation } from '@trpc/client';
// import { Task } from 'models';
// import { getTasks, createTask, updateTask } from 'api/tasks'; // Exemplo de nomenclatura
// import { useState } from 'react';

// function TodoList() {
//   const { data: tasks } = useQuery(['tasks.all'], getTasks);
//   const addTask = useMutation(createTask);
//   const updateTaskStatus = useMutation(updateTask);
//   const [newTaskTitle, setNewTaskTitle] = useState('');

//   const handleAddTask = async () => {
//     if (!newTaskTitle) return;

//     await addTask.mutateAsync({ title: newTaskTitle });
//     setNewTaskTitle('');
//   };

//   const handleTaskStatusChange = async (task: Task) => {
//     await updateTaskStatus.mutateAsync({ id: task.id, completed: !task.completed });
//   };

//   return (
//     <div className="bg-black p-4">
//       <h1 className="text-white text-2xl">To-Do List</h1>
//       <div className="flex mt-4 space-x-2">
//         <input
//           type="text"
//           placeholder="Nova tarefa"
//           className="w-full py-2 px-3 rounded-lg border border-gray-300 text-black"
//           value={newTaskTitle}
//           onChange={(e) => setNewTaskTitle(e.target.value)}
//         />
//         <button
//           onClick={handleAddTask}
//           className="bg-blue-500 text-white py-2 px-4 rounded-lg"
//         >
//           Adicionar
//         </button>
//       </div>
//       <ul className="mt-4 space-y-2">
//         {tasks?.map((task) => (
//           <li key={task.id} className="flex items-center">
//             <input
//               type="checkbox"
//               checked={task.completed}
//               onChange={() => handleTaskStatusChange(task)}
//               className="w-5 h-5 rounded-full border border-gray-300 checked:bg-blue-500 checked:border-transparent"
//             />
//             <span className={`ml-2 ${task.completed ? 'line-through text-gray-400' : 'text-white'}`}>{task.title}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default TodoList;


// components/TaskList.tsx localstorage

import { useEffect, useState } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(storedTasks.split(','));
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
    updatedTasks[index] = `✅ ${tasks[index]}`;
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <input
        type="text"
        placeholder="Nova Tarefa"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Adicionar</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <label>
              <input type="checkbox" onChange={() => toggleComplete(index)} />
              {task.startsWith('✅ ') ? (
                <del>{task.substring(2)}</del>
              ) : (
                task
              )}
            </label>
            <button onClick={() => deleteTask(index)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;




