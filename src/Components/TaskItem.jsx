import { useDrag } from "react-dnd";

const TaskItem = ({ task, removeTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK", // Drag type must match what you defined in `useDrop` in `TaskColumn2`
    item: { id: task.id }, // Data associated with the dragged item
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`bg-base-100 p-3 rounded-md shadow-md ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <h3 className="font-semibold">{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={() => removeTask(task.id)} className="text-red-500 mt-2">
        Remove
      </button>
    </div>
  );
};

export default TaskItem;
