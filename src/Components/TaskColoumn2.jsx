import { useState } from "react";
import { useDrop } from "react-dnd";
import TaskItem from "./TaskItem";
import { HiOutlinePlus } from "react-icons/hi";

const TaskColumn2 = ({ category, tasks, addTask, removeTask, moveTask }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category,
  });
  const [showInput, setShowInput] = useState(false);

  const [{ isOver }, drop] = useDrop({
    accept: "TASK", // The type of draggable item we are accepting
    drop: (item) => moveTask(item.id, category), // Handle the drop
    collect: (monitor) => ({
      isOver: !!monitor.isOver(), // Is the item currently being dragged over this column?
    }),
  });

  // Add Task
  const handleAddTask = () => {
    if (!newTask.title.trim()) return; // Ensure title is not empty
    console.log("Adding task:", newTask); // Debugging log

    addTask(newTask); // Add the task via the parent function
    setNewTask({ title: "", description: "", category }); // Reset form state
    setShowInput(false); // Hide the input form after adding the task
  };

  return (
    <div ref={drop} className="w-96 bg-base-300 p-4 rounded-2xl shadow-md">
      <h2 className="font-semibold">{category}</h2>
      <div className="mt-4 space-y-2">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} removeTask={removeTask} />
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
            onClick={handleAddTask}
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
