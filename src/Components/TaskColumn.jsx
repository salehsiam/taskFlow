import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { HiOutlinePlus } from "react-icons/hi";
import SortableTask from "./SortableTask";

const TaskColumn = ({ category, tasks, setTasks }) => {
  const [newTask, setNewTask] = useState("");
  const { setNodeRef } = useDroppable({ id: category });

  // Add a new task
  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now().toString(), title: newTask, category },
    ]);
    setNewTask("");
  };

  return (
    <div ref={setNodeRef} className="w-96 bg-gray-100 p-4 rounded-md shadow-md">
      <h2 className="font-bold">{category}</h2>
      <SortableContext items={tasks}>
        {tasks.map((task) => (
          <SortableTask key={task.id} task={task} />
        ))}
      </SortableContext>

      <div className="flex items-center gap-2 mt-4">
        <HiOutlinePlus className="cursor-pointer" onClick={addTask} />
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a task..."
          className="flex-1 p-2 border rounded"
        />
      </div>
    </div>
  );
};

export default TaskColumn;
