import { useDrag } from "react-dnd";
import { AiOutlineClose } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

const TaskItem = ({ task, removeTask, setEditingTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task.id, category: task.category },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`bg-base-200 p-3 rounded-md hover:bg-base-100 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-primary">{task.title}</h3>
        <div className="flex gap-2">
          <FaEdit
            onClick={() => setEditingTask(task)}
            className="cursor-pointer text-blue-500 hover:text-blue-700"
          />
          <AiOutlineClose
            onClick={() => removeTask(task.id)}
            className="cursor-pointer text-red-500 hover:text-red-700"
          />
        </div>
      </div>
      <p className="text-sm text-text2 mt-1">{task.description}</p>
      <p className="text-xs text-text3 mt-1">{task.timestamp}</p>
    </div>
  );
};

export default TaskItem;
