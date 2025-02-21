import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  DndContext,
  closestCorners,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";

const API_URL = "http://localhost:5000";

const TaskBoard = () => {
  const [tasks, setTasks] = useState({ todo: [], "in progress": [], done: [] });
  const [newTaskName, setNewTaskName] = useState(""); // State for new task name
  const [newTaskStatus, setNewTaskStatus] = useState("todo"); // Default status for new task

  // Sensors for drag
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  // Fetch tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_URL}/tasks`);
      const groupedTasks = { todo: [], "in progress": [], done: [] };
      res.data.forEach((task) => {
        if (groupedTasks[task.status]) {
          groupedTasks[task.status].push(task);
        }
      });
      setTasks(groupedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Handle Drag and Drop
  const onDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeTask = active.data.current;
    const newStatus = over.data.current.status;

    // Optimistically update state
    setTasks((prev) => {
      const newTasks = { ...prev };
      newTasks[activeTask.status] = newTasks[activeTask.status].filter(
        (task) => task._id !== activeTask._id
      );
      const updatedTask = { ...activeTask, status: newStatus };
      newTasks[activeTask.status] = newTasks[activeTask.status];
      newTasks[newStatus] = [...newTasks[newStatus], updatedTask];
      return newTasks;
    });

    // Update task in backend
    try {
      await axios.put(`${API_URL}/tasks/${activeTask._id}`, {
        status: newStatus,
      });
      fetchTasks(); // Re-fetch tasks to keep the UI in sync
    } catch (error) {
      console.error("Error updating task:", error);
      fetchTasks();
    }
  };

  // Handle adding a new task
  const addNewTask = async () => {
    if (!newTaskName || !newTaskStatus) return;

    try {
      const newTask = { name: newTaskName, status: newTaskStatus };
      await axios.post(`${API_URL}/tasks`, newTask);

      // Clear input fields after adding the task
      setNewTaskName("");
      setNewTaskStatus("todo");

      // Fetch tasks again to include the new task
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>

      {/* Task creation form */}
      <div className="mb-4">
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="Task Name"
          className="p-2 border rounded mr-2"
        />
        <select
          value={newTaskStatus}
          onChange={(e) => setNewTaskStatus(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="todo">To Do</option>
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button
          onClick={addNewTask}
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Add Task
        </button>
      </div>

      <DndContext
        collisionDetection={closestCorners}
        sensors={sensors}
        onDragEnd={onDragEnd}
      >
        <div className="flex justify-center gap-6">
          {Object.keys(tasks).map((status) => (
            <div
              key={status}
              className="w-1/3 p-4 bg-gray-100 rounded shadow-lg min-h-[200px]"
            >
              <h2 className="text-xl font-bold mb-3">{status.toUpperCase()}</h2>

              <SortableContext
                items={tasks[status]}
                strategy={verticalListSortingStrategy}
              >
                {tasks[status].map((task) => (
                  <TaskCard key={task._id} task={task} />
                ))}
              </SortableContext>
            </div>
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default TaskBoard;
