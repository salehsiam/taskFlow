import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TaskCard = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task._id, // Make sure this is the task's unique _id
      data: { status: task.status, name: task.name, _id: task._id }, // Include _id explicitly
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="p-4 mb-2 bg-white shadow rounded cursor-pointer"
    >
      {task.name}
    </div>
  );
};

export default TaskCard;
