import React, { useState } from "react";

// import { v4 as uuidv4 } from "uuid"; // To generate unique task IDs
import TaskColumn2 from "./TaskColoumn2";

const TaskBoard2 = () => {
  const [tasks, setTasks] = useState([]);

  // Function to add a new task
  const addTask = (newTask) => {
    const taskWithId = { ...newTask, id: uuidv4() };
    setTasks((prevTasks) => [...prevTasks, taskWithId]);
  };

  // Function to remove a task
  const removeTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // Function to move a task to another category
  const moveTask = (taskId, newCategory) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, category: newCategory } : task
      )
    );
  };

  return (
    <div className="flex flex-row md:flex-col gap-4">
      <TaskColumn2
        category="To-Do"
        tasks={tasks.filter((task) => task.category === "To-Do")}
        addTask={addTask}
        removeTask={removeTask}
        moveTask={moveTask}
      />
      <TaskColumn2
        category="In Progress"
        tasks={tasks.filter((task) => task.category === "In Progress")}
        addTask={addTask}
        removeTask={removeTask}
        moveTask={moveTask}
      />
      <TaskColumn2
        category="Done"
        tasks={tasks.filter((task) => task.category === "Done")}
        addTask={addTask}
        removeTask={removeTask}
        moveTask={moveTask}
      />
    </div>
  );
};

export default TaskBoard2;
