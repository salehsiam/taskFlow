import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import axios from "axios";

const API_URL = "http://localhost:5000"; // Update with your backend URL if needed

const TaskCard = ({ task, fetchTasks }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task._id,
      data: { status: task.status, ...task },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    name: task.name,
    description: task.description || "",
  });

  // Handle Task Update
  const handleUpdate = async () => {
    if (!editedTask.name.trim()) return;
    try {
      await axios.put(`${API_URL}/tasks/${task._id}`, {
        name: editedTask.name,
        description: editedTask.description,
      });
      setIsEditing(false);
      fetchTasks(); // Refresh task list
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Handle Task Deletion
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/tasks/${task._id}`);
      fetchTasks(); // Refresh task list
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="p-4 mb-2 bg-white shadow rounded cursor-pointer flex flex-col gap-2"
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTask.name}
            onChange={(e) =>
              setEditedTask({ ...editedTask, name: e.target.value })
            }
            className="border p-1 rounded"
          />
          <textarea
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
            className="border p-1 rounded"
            placeholder="Description (optional)"
          />
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="px-2 py-1 bg-green-500 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-2 py-1 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className="font-bold">{task.name}</h3>
          {task.description && (
            <p className="text-sm text-gray-600">{task.description}</p>
          )}
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="px-2 py-1 bg-blue-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;
