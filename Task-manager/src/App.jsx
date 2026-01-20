import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  const getTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/v1/task/getTasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTasks(res.data);
  };

  const addTask = async () => {
    await axios.post(
      "http://localhost:5000/api/v1/task/createTask",
      { title },
      // {
      //   headers: { Authorization: `Bearer ${token}` },
      // },
    );
    getTasks();
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks(); // your existing function
        setTasks(data); // safe to call here
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="p-10">
      <input
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2"
      />
      <button onClick={addTask} className="bg-blue-500 text-white p-2 ml-2">
        Add
      </button>

      {tasks.map((task) => (
        <p key={task._id}>{task.title}</p>
      ))}
    </div>
  );
}

export default App;
