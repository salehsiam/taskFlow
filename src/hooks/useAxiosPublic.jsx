import axios from "axios";
export const axiosPublic = axios.create({
  baseURL: "https://task-flow-server-steel.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
