import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import useAuth from "./useAuth";

const useTasks = () => {
  const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
  // const apiUrl = import.meta.env.VITE_API_URL;
  const { user } = useAuth();

  const { refetch, data, isError, error } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      if (!user?.email) return;
      const { data } = await axios.get(
        `https://task-flow-server-steel.vercel.app/tasks/${user.email}`
      );
      return {
        todo: data.todo.sort((a, b) => a.order - b.order),
        inProgress: data.inProgress.sort((a, b) => a.order - b.order),
        done: data.done.sort((a, b) => a.order - b.order),
      };
    },
    enabled: !!user?.email,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data]);

  if (isError) {
    console.error("Error fetching tasks:", error);
  }

  return { tasks, setTasks, refetch };
};

export default useTasks;
