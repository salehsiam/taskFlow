import { useState } from "react";
import { useDrop } from "react-dnd";
import TaskItem from "./TaskItem";
import { HiOutlinePlus } from "react-icons/hi";
import axios from "axios";

const TaskColumn2 = ({ category, tasks, setTasks }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category,
  });
  const [showInput, setShowInput] = useState(false);

  // Drag-and-Drop functionality
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item) => moveTask(item._id, category), // Call moveTask
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  // Add Task (Backend Connected)
  const addTask = async () => {
    if (!newTask.title.trim()) return;

    try {
      const res = await axios.post("http://localhost:5000/tasks", newTask);
      if (res.data.insertedId) {
        setTasks([...tasks, { ...newTask, _id: res.data.insertedId }]);
      }
      setNewTask({ title: "", description: "", category });
      setShowInput(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Edit Task (Backend Connected)
  const editTask = async (updatedTask) => {
    try {
      await axios.put(
        `http://localhost:5000/tasks/${updatedTask._id}`,
        updatedTask
      );
      setTasks(
        tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete Task (Backend Connected)
  const removeTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Move Task (Backend Connected)
  const moveTask = async (taskId, newCategory) => {
    try {
      const taskToUpdate = tasks.find((task) => task._id === taskId);
      if (!taskToUpdate) return;

      const updatedTask = { ...taskToUpdate, category: newCategory };
      await axios.put(`http://localhost:5000/tasks/${taskId}`, updatedTask);

      setTasks(tasks.map((task) => (task._id === taskId ? updatedTask : task)));
    } catch (error) {
      console.error("Error moving task:", error);
    }
  };

  return (
    <div
      ref={drop}
      className={`w-96 bg-base-300 p-4 rounded-2xl shadow-md ${
        isOver ? "bg-gray-200" : ""
      }`}
    >
      <h2 className="font-semibold">{category}</h2>
      <div className="mt-4 space-y-2">
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            editTask={editTask}
            removeTask={removeTask}
          />
        ))}
      </div>

      {/* Add Task Input */}
      {showInput ? (
        <div className="mt-2 bg-base-200 p-3 rounded-md">
          <input
            type="text"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="w-full p-2 rounded-md bg-base-100 text-text1"
            placeholder="Title"
          />
          <textarea
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            className="w-full p-2 rounded-md bg-base-100 text-text1 mt-2"
            placeholder="Description"
          />
          <button
            onClick={addTask}
            className="w-full py-2 bg-primary text-white rounded-md mt-2"
          >
            Add Task
          </button>
        </div>
      ) : (
        <div
          className="flex items-center gap-2 mt-4 cursor-pointer text-text2 hover:text-primary"
          onClick={() => setShowInput(true)}
        >
          <HiOutlinePlus />
          <p>Add a card</p>
        </div>
      )}
    </div>
  );
};

export default TaskColumn2;
