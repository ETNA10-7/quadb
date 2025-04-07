// import { useEffect, useState } from "react";
// import icp_backend from "./icp";

// function App() {
//   const [tasks, setTasks] = useState<string[]>([]);
//   const [newTask, setNewTask] = useState("");

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   async function fetchTasks() {
//     try {
//       const result = await icp_backend.get_tasks();
//       setTasks(result);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   }

//   async function addTask() {
//     if (!newTask.trim()) return;
//     try {
//       await icp_backend.add_task(newTask);
//       setNewTask("");
//       fetchTasks();
//     } catch (error) {
//       console.error("Error adding task:", error);
//     }
//   }

//   return (
//     <div>
//       <h1>ICP Web3 To-Do List</h1>
//       <input
//         type="text"
//         value={newTask}
//         onChange={(e) => setNewTask(e.target.value)}
//         placeholder="Enter a task"
//       />
//       <button onClick={addTask}>Add Task</button>

//       <ul>
//         {tasks.map((task, index) => (
//           <li key={index}>{task}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;


// 2 
// import { useEffect, useState } from "react";
// import icp_backend from "./icp";

// interface Task {
//   id: number;
//   text: string;
// }

// function App() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [newTask, setNewTask] = useState("");

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   async function fetchTasks() {
//     try {
//       const result = await icp_backend.get_tasks();
//       console.log("Fetched tasks:", result); // Debugging output

//       // Convert tuples [id, text] into objects { id, text }
//       const formattedTasks = result.map(([id, text]: [number, string]) => ({
//         id,
//         text,
//       }));

//       // Sort tasks by ID to maintain order
//       formattedTasks.sort((a, b) => a.id - b.id);

//       setTasks(formattedTasks);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   }

//   async function addTask() {
//     if (!newTask.trim()) return;
//     try {
//       await icp_backend.add_task(newTask);
//       setNewTask("");
//       fetchTasks(); // Refresh the task list
//     } catch (error) {
//       console.error("Error adding task:", error);
//     }
//   }

//   async function deleteTask(id: number) {
//     try {
//       await icp_backend.delete_task(id);
//       fetchTasks(); // Refresh the list
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   }

//   return (
//     <div>
//       <h1>ICP Web3 To-Do List</h1>
//       <input
//         type="text"
//         value={newTask}
//         onChange={(e) => setNewTask(e.target.value)}
//         placeholder="Enter a task"
//       />
//       <button onClick={addTask}>Add Task</button>

//       <ul>
//         {tasks.map((task) => (
//           <li key={task.id}>
//             {task.text} <button onClick={() => deleteTask(task.id)}>❌</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;


// 3
import { useEffect, useState } from "react";
import icp_backend from "./icp";

interface Task {
  id: number;
  text: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  // API GET Route
  async function fetchTasks() {
    try {
      const result = await icp_backend.get_tasks();
      console.log("Fetched raw tasks:", result); // Debugging output

      // Ensure we correctly map the result into tasks
      if (Array.isArray(result)) {
        const formattedTasks = result
          .filter((task: any) => Array.isArray(task) && task.length === 2)
          .map(([id, text]: [number, string]) => ({
            id,
            text,
          }));

        console.log("Formatted tasks:", formattedTasks); // Debugging output
        setTasks(formattedTasks);
      } else {
        console.error("Unexpected task format:", result);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  // API POST Route
  async function addTask() {
    if (!newTask.trim()) return;
    try {
      await icp_backend.add_task(newTask);
      setNewTask("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }

  async function deleteTask(id: number) {
    try {
      await icp_backend.delete_task(id);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  // return (
  //   <div>
  //     <h1>ICP Web3 To-Do List</h1>
  //     <input
  //       type="text"
  //       value={newTask}
  //       onChange={(e) => setNewTask(e.target.value)}
  //       placeholder="Enter a task"
  //     />
  //     <button onClick={addTask}>Add Task</button>

  //     <ul>
  //       {tasks.length > 0 ? (
  //         tasks.map((task) => (
  //           <li key={task.id}>
  //             {task.text ? task.text : "(No Text)"}{" "}
  //             <button onClick={() => deleteTask(task.id)}>❌</button>
  //           </li>
  //         ))
  //       ) : (
  //         <p>No tasks available</p>
  //       )}
  //     </ul>
  //   </div>
  // );

  return (
    <div>
      <h1>ICP Web3 To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a task"
      />
      <button onClick={addTask}>Add Task</button>
  
      <ul>
  {tasks.length > 0 ? (
    tasks.map((task, index) => (
      <li key={task.id}>
        {index + 1}. {task.text ? task.text : "(No Text)"}{" "}
        <button onClick={() => deleteTask(task.id)}>❌</button>
      </li>
    ))
  ) : (
    <p>No tasks available</p>
  )}
</ul>
    </div>
  );
  
}

export default App;
