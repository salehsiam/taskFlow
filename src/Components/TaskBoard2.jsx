import { useState } from "react";
import TaskColumn2 from "./TaskColoumn2";

const categories = ["To-Do", "In Progress", "Done"];

const TaskBoard2 = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
  };

  const editTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const moveTask = (taskId, newCategory) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, category: newCategory } : task
      )
    );
  };

  return (
    <div className="flex justify-center gap-4 p-5">
      {categories.map((category) => (
        <TaskColumn2
          key={category}
          category={category}
          tasks={tasks.filter((task) => task.category === category)}
          addTask={addTask}
          editTask={editTask}
          removeTask={removeTask}
          moveTask={moveTask} // Pass moveTask as a prop
        />
      ))}
    </div>
  );
};

export default TaskBoard2;
