import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("https://task-flow-server-steel.vercel.app", {
  transports: ["websocket"], // Force WebSocket transport
  reconnection: true, // Enable reconnection
  reconnectionAttempts: 5, // Try to reconnect 5 times
  reconnectionDelay: 3000, // Wait 3 seconds between attempts
});

const useWebSocket = (setTasks) => {
  useEffect(() => {
    socket.on("task-added", (task) => {
      setTasks((prev) => [...prev, task]);
    });

    socket.on("task-updated", (updatedTask) => {
      setTasks((prev) =>
        prev.map((task) =>
          task._id === updatedTask.id ? { ...task, ...updatedTask } : task
        )
      );
    });

    socket.on("task-deleted", (taskId) => {
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    });

    return () => {
      socket.off("task-added");
      socket.off("task-updated");
      socket.off("task-deleted");
    };
  }, [setTasks]);
};

export default useWebSocket;
