import { useState, useEffect } from "react";
import TaskColumn from "./TaskColumn";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";

const categories = ["To-Do", "In Progress", "Done"];

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  // Fetch tasks from backend
  useEffect(() => {
    if (user?.email) {
      axiosPublic.get(`/tasks?email=${user.email}`).then((res) => {
        setTasks(res.data);
      });
    }
  }, [user, axiosPublic]);

  // Add a new task
  const addTask = async (newTask) => {
    const task = {
      ...newTask,
      email: user.email,
      timestamp: new Date().toLocaleString(),
    };
    try {
      const res = await axiosPublic.post("/tasks", task);
      if (res.data.insertedId) {
        setTasks([...tasks, { ...task, _id: res.data.insertedId }]);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Edit Task
  const editTask = async (updatedTask) => {
    try {
      await axiosPublic.put(`/tasks/${updatedTask._id}`, updatedTask);
      setTasks(
        tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Remove Task
  const removeTask = async (taskId) => {
    try {
      await axiosPublic.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="flex justify-center gap-4 p-5">
      {categories.map((category) => (
        <TaskColumn
          key={category}
          category={category}
          tasks={tasks.filter((task) => task.category === category)}
          addTask={addTask}
          editTask={editTask}
          removeTask={removeTask}
        />
      ))}
    </div>
  );
};

export default TaskBoard;
