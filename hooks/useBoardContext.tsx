import { BoardType } from "@/zstore";
import React, { createContext, useContext } from "react";

type BoardContenxtProps = {
  board: BoardType;
  setCurrentBoard: React.Dispatch<React.SetStateAction<BoardType>>;
};
const BoardContext = createContext<BoardContenxtProps>(
  {} as BoardContenxtProps
);
const useBoardContext = () => {
  const data = useContext(BoardContext);
  return data;
};
export { BoardContext };
export default useBoardContext;
