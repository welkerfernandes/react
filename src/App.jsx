import { useEffect, useState } from "react";
import AddTaks from "./components/AddTasks.jsx";
import Tasks from "./components/Tasks.jsx";
import { v4 } from "uuid";
import Title from "./components/Title.jsx";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || [
      {
        id: 1,
        title: "iPhone 14",
        description: "muito bom e com a camera boa",
        isCompleted: false,
      },
      {
        id: 2,
        title: "Samsung",
        description: "Filma longe pra caramba",
        isCompleted: false,
      },
      {
        id: 3,
        title: "Xiaomi",
        description: "Deixa todo mundo branco como neve",
        isCompleted: false,
      },
    ]
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }

      //nao precisa atualizar a tarefa

      return task;
    });

    setTasks(newTasks);
  }

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
        {
          method: "GET",
        }
      );

      const data = await response.json();
      setTasks(data);
    };
    //fetchTasks();
  }, []);

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id != taskId);
    setTasks(newTasks);
    localStorage.removeItem(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTasks = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTasks]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Tasks Manager</Title>
        <AddTaks onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
