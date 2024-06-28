import { BoardType } from "@/types/boardTypes";
import React, { createContext, useContext } from "react";

type BoardContenxtProps = {
  board: BoardType;
  setCurrentBoard: React.Dispatch<React.SetStateAction<BoardType>>;
  deleteSprint: (e: string) => Promise<any>;
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
