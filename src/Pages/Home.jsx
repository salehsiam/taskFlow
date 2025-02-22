import { DndProvider } from "react-dnd";
import TaskBoard from "../Components/TaskBoard";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskBoard2 from "../Components/TaskBoard2";

const Home = () => {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <TaskBoard />
      </DndProvider>
    </div>
  );
};

export default Home;
